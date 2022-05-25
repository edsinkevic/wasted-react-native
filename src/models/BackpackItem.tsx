import { Offer } from './Offer';
import { OfferEntry } from './OfferEntry';

export interface BackpackItem {
  id: string;
  entry: OfferEntry;
  amount: number;
}
