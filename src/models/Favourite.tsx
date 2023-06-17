import { Cat } from './Cat';
import { Profile } from './User';

export interface Favourite {
  id: string;
  user: Profile;
  cat: Cat;
  status: string;
}

export interface FavouriteCreateForm {
  user: string;
  cat: string;
  status: string;
}
