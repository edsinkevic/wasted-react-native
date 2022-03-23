import { Offer } from "./Offer";

export interface OfferEntry {
  id: string;
  offer: Offer;
  expiry: string;
  added: string;
  amount: number;
}
