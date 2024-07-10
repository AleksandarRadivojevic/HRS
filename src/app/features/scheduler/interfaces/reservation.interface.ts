import { ReservationStatus } from "./reservation-status.enum";

export interface Reservation {
  id: number;
  fullName: string;
  startTime: Date;
  endTime: Date;
  specialRequests: string;
  status: ReservationStatus;
}
