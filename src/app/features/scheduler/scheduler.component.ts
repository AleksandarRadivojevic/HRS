import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  View,
  EventSettingsModel,
} from '@syncfusion/ej2-angular-schedule';

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
  public data: object[] = [
    {
      TravelId: 2,
      TravelSummary: 'Paris',
      DepartureTime: new Date(2018, 1, 15, 10, 0),
      ArrivalTime: new Date(2018, 1, 15, 12, 30),
      FullDay: false,
      Source: 'London',
      Comments: 'Summer vacation planned for outstation.',
      Origin: 'Asia/Yekaterinburg',
      Destination: 'Asia/Yekaterinburg',
    },
  ];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'TravelId',
      subject: { name: 'TravelSummary' },
      isAllDay: { name: 'FullDay' },
      location: { name: 'Source' },
      description: { name: 'Comments' },
      startTime: { name: 'DepartureTime' },
      endTime: { name: 'ArrivalTime' },
      startTimezone: { name: 'Origin' },
      endTimezone: { name: 'Destination' },
    },
  };
}
