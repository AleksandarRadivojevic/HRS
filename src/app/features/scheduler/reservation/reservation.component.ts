import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Reservation } from '../interfaces/reservation.interface';
import { DateRangePickerModule, RangeEventArgs } from '@syncfusion/ej2-angular-calendars';
import { TextAreaModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationStatus } from '../interfaces/reservation-status.enum';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [DateRangePickerModule, TextAreaModule, TextBoxModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  public form!: FormGroup;
  public isMobileView = false;
  public dateRangeValue: Date[] = [];
  private readonly formBuilder = inject(FormBuilder);
  public minDate = new Date();

  @Input() set clearReservationForm(value: boolean) {
    if (value) {
      this.initForm();
      this.dateRangeValue = [];
    }
  }

  @Output() public onCloseDialog: EventEmitter<Reservation | null> = new EventEmitter();

  public ngOnInit(): void {
    this.isMobileView = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      fullName: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      specialRequests: [''],
      status: [ReservationStatus.Scheduled],
      isAllDay: true,
    });
  };

  public getReservationDays(resDays: RangeEventArgs): void {
    this.form.get('startDate')?.patchValue(resDays.startDate);
    this.form.get('endDate')?.patchValue(resDays.endDate);
  }

  public closeDialog(res: Reservation | null): void {
    this.onCloseDialog.emit(res);
  }
}
