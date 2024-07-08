import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Reservation } from '../interfaces/reservation.interface';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TextAreaModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [DateRangePickerModule, TextAreaModule, TextBoxModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  public isMobileView = false;
  @Output() public onCloseDialog: EventEmitter<Reservation | null> = new EventEmitter();

  public ngOnInit(): void {
    this.isMobileView = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
}
