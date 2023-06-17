import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cat } from '../models/Cat';
import { useCat } from '../contexts/CatContext';
import AlignItemsList from '../components/AlignItemsList';
import { useFavourite } from '../contexts/FavouriteContext';
import { Favourite } from '../models/Favourite';
import { useAuth } from '../contexts/AuthContext';
import { useChatRoom } from '../contexts/ChatRoomContext';
import { ChatRoom } from '../models/ChatRoom';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '../models/Message';
import { useMessage } from '../contexts/MessageContext';

export default function CatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const message = useMessage();
  let cat = useCat();
  let favourite = useFavourite();
  let chatRoom = useChatRoom();

  const [catItem, setCatItem] = useState<Cat>({
    id: '',
    name: '',
    breed: '',
    age: '',
    description: '',
    image: '',
    status: ''
  });
  const [favouriteItem, setFavouriteItem] = useState<Favourite>();
  const [chatRoomItem, setChatRoomItem] = useState<string>('');
  const [chatMessage, setChatMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const initCat = async () => {
    const result = await cat.getCat(id ?? '');
    setCatItem(result);
  };

  const initFavourite = async () => {
    const result = await favourite.listFavourite();
    setFavouriteItem(result.filter((x: any) => x['cat']['id'] == id)[0]);
  };

  const initChatRoom = async () => {
    const result = await chatRoom.listChatRoom();
    console.log('chat room result', result);

    if (result.filter((x: any) => x['cat']['id'] == id && x['user']['id'] == auth.getID())[0] != null) {
      console.log('have chat room');
      setChatRoomItem(result.filter((x: any) => x['cat']['id'] == id && x['user']['id'] == auth.getID())[0].id);
      setChatMessage(result.filter((x: any) => x['cat']['id'] == id && x['user']['id'] == auth.getID())[0].messages);
      if (result.filter((x: any) => x['cat']['id'] == id && x['user']['id'] == auth.getID())[0].messages.length == 0) {
        const result2 = await message.createMessage({
          chatRoom: result.filter((x: any) => x['cat']['id'] == id && x['user']['id'] == auth.getID())[0].id,
          text: 'Hi, I am interested in this cat.',
          user: auth.getID().toString(),
          cat: catItem.id
        });
        initChatRoom();
      }
      console.log('chat room result', result);
    }
  };

  const handleCatDelete = async () => {
    if (catItem != null) {
      const result = await cat.deleteCat(catItem);
      if (result === 'Success') {
        navigate('/');
      }
    }
  };

  const handleNewChatRoom = async () => {
    if (catItem != null) {
      const result = await chatRoom.createChatRoom({ cat: catItem.id, user: parseInt(auth.getID()) });
      if (result === 'Success') {
        initChatRoom();
      }
    }
  };

  const handleCatFavorite = async () => {
    if (favouriteItem != null) {
      const result = await favourite.deleteFavourite(favouriteItem);
      if (result === 'Success') {
        initFavourite();
      }
    }
  };

  const handleOnSubmit = async () => {
    console.log('onclick');

    const result = await message.createMessage({
      chatRoom: chatRoomItem,
      text: newMessage,
      user: auth.getID().toString(),
      cat: catItem.id
    });
    if (result === 'Success') {
      console.log('success');
      initChatRoom();
      setNewMessage('');
    }
  };

  useEffect(() => {
    initCat();
    initFavourite();
    initChatRoom();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={catItem && `${import.meta.env.VITE_API_URL}/uploads/${catItem.image}`}
          />
          <Box>
            <Typography component="div" variant="h1">
              {catItem && catItem.name}
            </Typography>
            <Typography component="div" variant="body1" color="text.secondary">
              {catItem && catItem.description}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 'auto' }}>
              {auth.getRole() == '1' && (
                <Button
                  variant={favouriteItem?.status == '1' ? 'contained' : 'outlined'}
                  color="success"
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={handleCatFavorite}
                >
                  Favourite
                </Button>
              )}
              {auth.getRole() == '2' && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 1 }}
                  onClick={() => navigate(`/cat/edit/${catItem && catItem.id}`)}
                >
                  Edit
                </Button>
              )}
              {auth.getRole() == '2' && (
                <Button variant="contained" color="error" fullWidth sx={{ mb: 1 }} onClick={handleCatDelete}>
                  Delete
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ my: 5 }}>
        {auth.getRole() == '1' && chatRoomItem == '' && (
          <Button variant="contained" color="error" fullWidth sx={{ mb: 1 }} onClick={handleNewChatRoom}>
            New Chat
          </Button>
        )}
        {auth.getRole() == '1' && chatRoomItem != '' && (
          <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={9}>
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
          </CardContent>
        )}
      </Card>
    </Container>
  );
}
