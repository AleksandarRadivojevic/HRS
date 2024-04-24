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
} from '@syncfusion/ej2-angular-schedule';
import { Reservation } from './interfaces/reservation.interface';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [ScheduleModule],
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
  public minDate = new Date();
  @ViewChild('scheduleObj')
  public scheduleObj?: ScheduleComponent;

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
  public data: Reservation[] = [
    {
      id: 1,
      fullName: 'Aleksandar Radivojevic',
      startTime: new Date(),
      endTime: new Date(),
      description: 'This is the test data',
      isAllDay: true,
    },
  ];

  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    enableTooltip: true,
    fields: {
      subject: { name: 'fullName' },
    },
  };

  public onCellClick(args: CellClickEventArgs): void {
    this.scheduleObj?.openEditor(args, 'Add');
    setTimeout(() => {
      this.scheduleObj?.closeQuickInfoPopup();
    });
  }
}
