import { Vendor } from "./Vendor";

export interface Member {
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  id: string;
  vendor: Vendor;
}
