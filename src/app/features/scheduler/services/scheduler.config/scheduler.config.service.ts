import { Injectable } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { SchedulerConfig } from '../../interfaces/scheduler-config.interface';
import { Reservation } from '../../interfaces/reservation.interface';

@Injectable()
export class SchedulerConfigService {
  public config: SchedulerConfig = {
    minDate: new Date().setDate(new Date().getDate() - 1),
    view: {
      current: 'Month',
      all: ['Week', 'Month', 'Agenda']
    }
  };

  public data: Reservation[] = [];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    enableTooltip: true,
    fields: {
      subject: { name: 'fullName' },
      startTime: { name: 'startDate' },
      endTime: { name: 'endDate' },
      description: { name: 'specialRequests' },
    }
  };
}
