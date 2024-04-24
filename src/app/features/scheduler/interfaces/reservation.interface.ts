export interface Reservation {
  id: number;
  fullName: string;
  startTime: Date;
  endTime: Date;
  description: string;
  isAllDay: boolean;
}
