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
import { Timestamp } from '@angular/fire/firestore';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SchedulerApiService } from './services/scheduler.api.service';

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
    SchedulerApiService,
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
  public schedulerApiService = inject(SchedulerApiService);
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.getAllReservations();
  }

  private getAllReservations(): void {
    this.schedulerApiService.getAllReservations().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((res: Reservation[]) => {
        res.forEach((reservation: Reservation) => this.schedulerConfig.data.push(reservation));
        this.scheduleObj?.refreshTemplates();
      })
    ).subscribe();
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

      this.schedulerApiService.addReservation(data).pipe(
        tap(() => this.clearReservationForm = true)
      ).subscribe();
    }
    this.dialog.hide();
  };
}
