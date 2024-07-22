import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ScheduleComponent,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { Reservation } from './interfaces/reservation.interface';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ReservationComponent } from './reservation/reservation.component';
import { SchedulerConfigService } from './services/scheduler.config.service';
import { addDoc, collection, collectionData, CollectionReference, DocumentData, DocumentReference, Firestore, Timestamp } from '@angular/fire/firestore';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ScheduleModule, DialogModule, ReservationComponent],
  providers: [
    DayService,
    WeekService,
    MonthService,
    AgendaService,
    WorkWeekService,
    SchedulerConfigService,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent implements OnInit {
  @ViewChild('scheduleObj', { static: false })
  public scheduleObj!: ScheduleComponent;

  @ViewChild('dialog', { static: false })
  public dialog!: DialogComponent;

  public clearReservationForm = false;
  protected selectedReservation!: Reservation;
  public schedulerConfig = inject(SchedulerConfigService);
  private firestore: Firestore = inject(Firestore);
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.getAllReservations();
  }

  private getAllReservations(): void {
    const firebaseCollection = collection(this.firestore, 'reservation');
    const firebaseCollectionData = collectionData<Reservation>(firebaseCollection as CollectionReference<Reservation, DocumentData>);

    firebaseCollectionData.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((res: Reservation[]) => {
        res.map((reservation: Reservation) => {
          this.schedulerConfig.data.push(
            {
              ...reservation,
              startDate: this.transformDateToTimestamp(reservation.startDate),
              endDate: this.transformDateToTimestamp(reservation.endDate),
            }
          );
        });
        this.scheduleObj?.refreshTemplates();
      }),
    ).subscribe();
  };

  // TODO: Adjust types
  private transformDateToTimestamp(date: any): any {
    // format date from firebase Timestamp to js Date
    const { seconds: startSeconds, nanoseconds: startNanoseconds } = date;
    return new Timestamp(startSeconds, startNanoseconds).toDate();
  };

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      this.selectedReservation = args.data as Reservation;
      args.cancel = true;
      if (this.dialog) {
        this.dialog.show();
      }
    };
  };

  public saveEvent(res: Reservation | null): void {
    if (res) {
      const data: Reservation = {
        ...res,
        startDate: Timestamp.fromDate(new Date(res.startDate.toString())),
        endDate: Timestamp.fromDate(new Date(res.endDate.toString())),
      };

      addDoc(collection(this.firestore, 'reservation'), data).then(() => this.clearReservationForm = true);
    }
    this.dialog.hide();
  }
}
