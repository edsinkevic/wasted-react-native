import { Reservation } from './Reservation';

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  id: string;
  reservations: Reservation[];
}
