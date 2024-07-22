import { Timestamp } from "@angular/fire/firestore";
import { ReservationStatus } from "./reservation-status.enum";

export interface Reservation {
  id: string;
  fullName: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  specialRequests: string;
  status: ReservationStatus;
  isAllDay: boolean;
}
