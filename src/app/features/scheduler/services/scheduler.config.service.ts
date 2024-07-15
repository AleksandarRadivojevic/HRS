import { Injectable } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { SchedulerConfig } from '../interfaces/scheduler-config.interface';

@Injectable()
export class SchedulerConfigService {

  public config: SchedulerConfig = {
    minDate: new Date().setDate(new Date().getDate() - 1),
    view: {
      current: 'Month',
      all: ['Week', 'Month', 'Agenda']
    }
  };

  // TEMPORARY - Will replace from response from API
  public data: Record<string, any>[] = [
    {
      id: 'abc-0123',
      fullName: 'Meeting',
      startDate: new Date(2024, 6, 15),
      endDate: new Date(2024, 6, 18),
      isAllDay: true,
      // isReadonly: true,
      // IsBlock: true,
      specialRequests: 'Hello from here!'
    }
  ];

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
