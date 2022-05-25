import { ReservationItem } from './ReservationItem';
import { User } from './User';

export interface Reservation {
  id: string;
  customerId: string;
  createdDate: Date;
  expirationDate: string;
  code: string;
  customer: User;
  reservationItems: ReservationItem[];
}
