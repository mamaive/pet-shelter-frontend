import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cat } from '../models/Cat';
import { useCat } from '../contexts/CatContext';
import AlignItemsList from '../components/AlignItemsList';

export default function CatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let cat = useCat();

  const [catItem, setCatItem] = useState<Cat>();

  const initCat = async () => {
    const result = await cat.getCat(id ?? '');
    console.log('cat list', result);
    setCatItem(result);
  };

  const handleCatDelete = async () => {
    if (catItem != null) {
      const result = await cat.deleteCat(catItem);
      if (result === 'Success') {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    initCat();
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate(`/cat/edit/${catItem && catItem.id}`)}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" fullWidth sx={{ mb: 1 }} onClick={handleCatDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ my: 5 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <AlignItemsList />
        </CardContent>
      </Card>
    </Container>
  );
}
