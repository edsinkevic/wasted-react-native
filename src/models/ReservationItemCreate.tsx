import { OfferEntry } from './OfferEntry';

export interface ReservationItemCreate {
  amount: number;
  entryId: string;
  entryAmount: number;
}
