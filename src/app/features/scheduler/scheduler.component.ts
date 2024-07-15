import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
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
export class SchedulerComponent {
  @ViewChild('scheduleObj', { static: false })
  public scheduleObj!: ScheduleComponent;

  @ViewChild('dialog', { static: false })
  public dialog!: DialogComponent;

  public readonly schedulerConfig = inject(SchedulerConfigService);

  public clearReservationForm = false;

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      args.cancel = true;
      if (this.dialog) {
        this.dialog.show();
      }
    }
  }

  public saveEvent(data: Reservation | null): void {
    if (data) {
      this.schedulerConfig.data.push(data);
      this.scheduleObj?.refreshTemplates();
    }
    // Tvoj kod za čuvanje događaja ide ovde
    if (this.dialog) {
      this.dialog.hide();
    }
    this.clearReservationForm = true;
  }
}
