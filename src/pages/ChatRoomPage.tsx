import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChatRoom } from '../contexts/ChatRoomContext';
import { useState, useEffect } from 'react';
import { ChatRoom } from '../models/ChatRoom';
import { Message } from '../models/Message';
import { Cat } from '../models/Cat';
import { useMessage } from '../contexts/MessageContext';
import { useAuth } from '../contexts/AuthContext';

export default function ChatRoomPage() {
  const chatRoom = useChatRoom();
  const message = useMessage();
  const auth = useAuth();

  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
  const [chatRoomItem, setChatRoomItem] = useState<string>('');
  const [chatMessage, setChatMessage] = useState<Message[]>([]);
  const [catInfo, setChatInfo] = useState<Cat>({
    id: '',
    name: '',
    breed: '',
    age: '',
    description: '',
    image: '',
    status: ''
  });
  const [newMessage, setNewMessage] = useState('');

  const initChatRoom = async () => {
    const result = await chatRoom.listChatRoom();
    setChatRoomList(result);
    if (catInfo != null) {
      setChatInfo(result[0].cat);
      setChatMessage(result[0].messages);
      setChatRoomItem(result[0].id);
    }
  };

  const handleSetChat = async (chatRoom: ChatRoom) => {
    setChatRoomItem(chatRoom.id);
    setChatInfo(chatRoom.cat);
    setChatMessage(chatRoom.messages);
  };

  const handleOnSubmit = async () => {
    console.log('onclick');

    const result = await message.createMessage({
      chatRoom: chatRoomItem,
      text: newMessage,
      user: auth.getID().toString(),
      cat: catInfo.id.toString()
    });
    if (result === 'Success') {
      console.log('success');
      initChatRoom();
      setNewMessage('');
    }
  };

  useEffect(() => {
    initChatRoom();
  }, []);
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper}>
        <Grid item xs={3}>
          <List>
            {chatRoomList.map((chatRoom: ChatRoom) => (
              <ListItemButton key={chatRoom.id} onClick={() => handleSetChat(chatRoom)}>
                <ListItemText primary={chatRoom.user.firstName + ' ' + chatRoom.user.lastName}></ListItemText>
                <ListItemText secondary={chatRoom.cat.name}></ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Grid>

        <Grid item xs={9}>
          {catInfo != null && (
            <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={catInfo && `${import.meta.env.VITE_API_URL}/uploads/${catInfo.image}`}
              />
              <Box>
                <Typography component="div" variant="h1">
                  {catInfo && catInfo.name}
                </Typography>
                <Typography component="div" variant="body1" color="text.secondary">
                  {catInfo && catInfo.description}
                </Typography>
              </Box>
            </CardContent>
          )}
          <Divider></Divider>
          <List>
            {chatMessage.map((message: Message) => (
              <ListItem key={message.id}>
                <ListItemText
                  primary={
                    message.user.firstName +
                    ' ' +
                    message.user.lastName +
                    (message.user.role == 2 ? ' (staff)' : ' (member)')
                  }
                  secondary={message.text + ' ' + message.createdAt}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: '10px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Button endIcon={<SendIcon />} className="p-button-info" onClick={handleOnSubmit}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
