import { Vendor } from "./Vendor";

export interface Offer {
  id: string;
  addedBy: Vendor;
  name: string;
  weight: number;
  category: string;
  price: number;
}
