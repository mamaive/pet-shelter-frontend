import { Cat } from './Cat';
import { Message } from './Message';
import { Profile } from './User';

export interface ChatRoom {
  id: string;
  user: Profile;
  cat: Cat;
  messages: Message[];
  status: string;
}

export interface ChatRoomCreateForm {
  user: number;
  cat: string;
}
