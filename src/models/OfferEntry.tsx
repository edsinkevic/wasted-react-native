import { Offer } from './Offer';
import { ReservationItem } from './ReservationItem';

export interface OfferEntry {
  id: string;
  offer: Offer;
  expiry: string;
  added: string;
  amount: number;
  reservationItems: ReservationItem[];
}
