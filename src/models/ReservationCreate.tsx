import { OfferEntry } from './OfferEntry';
import { ReservationItemCreate } from './ReservationItemCreate';

export interface ReservationCreate {
  customerId: string;
  items: ReservationItemCreate[];
}
