import { Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CatPage() {
  
  // async function getAllData() {
  //   try {
  //     const res = await fetch(`${baseURL}/tutorials`);

  //     if (!res.ok) {
  //       const message = `An error has occured: ${res.status} - ${res.statusText}`;
  //       throw new Error(message);
  //     }

  //     const data = await res.json();

  //     const result = {
  //       status: res.status + "-" + res.statusText,
  //       headers: {
  //         "Content-Type": res.headers.get("Content-Type"),
  //         "Content-Length": res.headers.get("Content-Length"),
  //       },
  //       length: res.headers.get("Content-Length"),
  //       data: data,
  //     };

  //     setGetResult(fortmatResponse(result));
  //   } catch (err) {
  //     setGetResult(err.message);
  //   }
  // }


  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" image="https://source.unsplash.com/random" alt="random" />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Heading
                </Typography>
                <Typography>This is a media card. You can use this section to describe the content.</Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
