import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Box, Button, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const chatJson = {
  data: [
    { id: 0, user: 'Theta', content: 'hello Tom!', timestamp: '2022-10-18 09:56:00.000' },
    { id: 1, user: 'Tom', content: 'hello Any!', timestamp: '2022-10-18 09:57:00.000' },
    { id: 2, user: 'Any', content: 'hello Theta!', timestamp: '2022-10-18 09:58:00.000' }
  ]
};

type Chat = {
  id: number;
  user: string;
  content: string;
  timestamp: string;
};

type ChatDataSource = {
  data: Array<Chat>;
};

const ChatService = () => {
  return {
    getChatHistory: (): ChatDataSource => chatJson
  };
};

interface ItemsChatListPorps {
  chatData: Array<Chat>;
}

interface SendMsgElementPorps {
  onCallback: (chats: Array<Chat>) => void;
  data: Array<Chat>;
}

const genChatRowUserInfo = (data: Chat): JSX.Element => {
  return (
    <>
      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
        {data.user}
      </Typography>
      <br />
      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
        {data.timestamp}
      </Typography>
    </>
  );
};

const genChatRow = (data: Chat): JSX.Element => {
  return (
    <div key={data.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary={genChatRowUserInfo(data)} secondary={data.content} />
      </ListItem>
      <Divider variant="inset" component="li" hidden />
    </div>
  );
};

const ItemsChatList = (props: ItemsChatListPorps) => {
  const chatData = props.chatData.map((data) => genChatRow(data));
  return (
    <List
      id="MainWin"
      sx={{ height: 500, width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto' }}
    >
      {chatData}
    </List>
  );
};

const SendMsgElement = (props: SendMsgElementPorps) => {
  const [newChat, setNewChat] = useState('');

  return (
    <div className="p-inputgroup">
      <Input
        autoFocus={true}
        placeholder="Text Here ..."
        value={newChat}
        onChange={(e) => {
          setNewChat(e.target.value);
        }}
      />
      <Button
        endIcon={<SendIcon />}
        className="p-button-info"
        onClick={() => {
          const updatedChatData = props.data.concat([refactorChat(props.data.length + 1, newChat)]);
          props.onCallback(updatedChatData);
          setNewChat('');
        }}
      >
        Send
      </Button>
    </div>
  );
};

const refactorChat = (id: number, sent: string): Chat => ({
  id: id,
  content: sent,
  timestamp: 'time',
  user: 'someone'
});

const scrollToButton = (idLabel: string) => {
  const chatWindowElement = document.getElementById(idLabel);
  if (chatWindowElement) {
    chatWindowElement.scrollTo(0, chatWindowElement.scrollHeight);
  }
};

export default function AlignItemsList() {
  const chatService = ChatService();
  const [chatData, setChatData] = useState<Array<Chat>>(chatService.getChatHistory().data);

  useEffect(() => {
    scrollToButton('MainWin');
  });

  return (
    <Box>
      <ItemsChatList chatData={chatData} />
      <Box className="col-12 md:col-4">
        <SendMsgElement onCallback={setChatData} data={chatData} />
      </Box>
    </Box>
  );
}
