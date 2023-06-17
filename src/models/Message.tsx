import { ChatRoom } from './ChatRoom';
import { Profile } from './User';

export interface Message {
  id: string;
  text: string;
  user: Profile;
  chatRoom: ChatRoom;
  status: string;
  createdAt: string;
}

export interface MessageCreateForm {
  chatRoom: string;
  text: string;
  user: string;
  cat: string;
}
