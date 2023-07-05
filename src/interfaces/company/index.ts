import { EnvironmentalAnalystInterface } from 'interfaces/environmental-analyst';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  environmental_analyst?: EnvironmentalAnalystInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    environmental_analyst?: number;
    team_member?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
