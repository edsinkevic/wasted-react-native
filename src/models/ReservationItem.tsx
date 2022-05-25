import { OfferEntry } from './OfferEntry';
import { Reservation } from './Reservation';

export interface ReservationItem {
  id: string;
  reservationId: string;
  entryId: string;
  amount: number;
  entry: OfferEntry;
  reservation: Reservation;
}
