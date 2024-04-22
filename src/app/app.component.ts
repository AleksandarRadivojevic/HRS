import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'house_reservation_app';
}
