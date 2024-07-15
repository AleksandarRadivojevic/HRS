import { ReservationStatus } from "./reservation-status.enum";

export interface Reservation {
  id: number;
  fullName: string;
  startDate: Date;
  endDate: Date;
  specialRequests: string;
  status: ReservationStatus;
  isAllDay: boolean;
}
