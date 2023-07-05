import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PublicUserInterface {
  id?: string;
  user_id?: string;
  donation?: number;
  carbon_emission?: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PublicUserGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
