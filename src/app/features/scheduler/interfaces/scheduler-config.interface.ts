import { View } from "@syncfusion/ej2-angular-schedule";

export interface SchedulerConfig {
    view: SchedulerViewConfig;
    minDate: number;
}

interface SchedulerViewConfig {
    current: View,
    all: View[],
}