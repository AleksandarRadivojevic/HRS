import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  View,
  EventSettingsModel,
  CellClickEventArgs,
  ScheduleComponent,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { Reservation } from './interfaces/reservation.interface';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ReservationComponent } from './reservation/reservation.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ScheduleModule, DialogModule, ReservationComponent],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent {
  public currentView: View = 'Month';
  public minDate = new Date().setDate(new Date().getDate() - 1);

  @ViewChild('scheduleObj', { static: false })
  public scheduleObj!: ScheduleComponent;

  @ViewChild('dialog', { static: false })
  public dialog!: DialogComponent;

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      args.cancel = true;
      if (this.dialog) {
        this.dialog.show();
      }
    }
  }

  public saveEvent(data: Reservation | null): void {
    console.log(data)
    // Tvoj kod za čuvanje događaja ide ovde
    if (this.dialog) {
      this.dialog.hide();
    }
  }

  // public data: object[] = [
  //   {
  //     TravelId: 2,
  //     TravelSummary: 'Paris',
  //     DepartureTime: new Date(2018, 1, 15, 10, 0),
  //     ArrivalTime: new Date(2018, 1, 15, 12, 30),
  //     FullDay: false,
  //     Source: 'London',
  //     Comments: 'Summer vacation planned for outstation.',
  //     Origin: 'Asia/Yekaterinburg',
  //     Destination: 'Asia/Yekaterinburg',
  //   },
  // ];
  // public data: Reservation[] = [
  //   {
  //     id: 1,
  //     fullName: 'Aleksandar Radivojevic',
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     description: 'This is the test data',
  //     isAllDay: true,
  //   },
  // ];

  public data: object[] = [{
    Id: 1,
    title: 'New New',
    Subject: 'Meeting',
    StartTime: new Date(2024, 6, 15),
    EndTime: new Date(2024, 6, 18),
    isAllDay: true
  }];

  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    enableTooltip: true,
    fields: {
      subject: { name: 'fullName' },
    },
  };

  public onCellClick(args: CellClickEventArgs): void {
    // this.scheduleObj?.openEditor(args, 'Add');
    // setTimeout(() => {
    //   this.scheduleObj?.closeQuickInfoPopup();
    // });
  }
}
