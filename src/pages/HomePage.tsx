import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCat } from '../contexts/CatContext';
import { Cat } from '../models/Cat';
import SearchIcon from '@mui/icons-material/Search';

function HomePage() {
  const navigate = useNavigate();
  let auth = useAuth();
  let cat = useCat();

  const [catList, setCatList] = useState<Cat[]>([]);

  const [filterSearchValue, setFilterSearchValue] = useState<string>('');
  const [filterBreedValue, setFilterBreedValue] = useState<string>('');

  const handleFilterSearchOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterSearchValue(event.target.value);
  };

  const handleFilterBreedOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterBreedValue(event.target.value);
  };

  const handleFilterReset = () => {
    setFilterSearchValue('');
    setFilterBreedValue('');
  };

  const filteredRows = catList.filter((item) => {
    if (filterSearchValue.length == 0 && filterBreedValue == '') {
      return true;
    }
    if (filterSearchValue.length > 0 && filterBreedValue == '') {
      console.log(
        item.name.toLowerCase(),
        filterSearchValue.toLowerCase(),
        item.name.toLowerCase().includes(filterSearchValue.toLowerCase())
      );
      return item.name.toLowerCase().includes(filterSearchValue.toLowerCase());
    }
    if (filterSearchValue.length == 0 && filterBreedValue != '') {
      return item.breed.toString() == filterBreedValue;
    }
    if (filterSearchValue.length > 0 && filterBreedValue != '') {
      return (
        item.name.toLowerCase().includes(filterSearchValue.toLowerCase()) && item.breed.toString() == filterBreedValue
      );
    }
    return false;
  });

  const initCatList = async () => {
    const result = await cat.listCat();
    console.log('cat list', result);
    setCatList(result);
  };

  useEffect(() => {
    initCatList();
  }, []);

  return (
    <Container>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item md={5} sx={{ width: '220px' }}>
                      <TextField
                        fullWidth
                        sx={{ mt: 2, mr: 1 }}
                        variant="outlined"
                        placeholder="Search by name"
                        value={filterSearchValue}
                        onChange={handleFilterSearchOnChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="action">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item md={5} sx={{ width: '220px' }}>
                      <TextField
                        select
                        fullWidth
                        sx={{ mt: 2 }}
                        label="Breed"
                        value={filterBreedValue}
                        onChange={handleFilterBreedOnChange}
                        variant="outlined"
                      >
                        <MenuItem value="aegean">Aegean</MenuItem>
                        <MenuItem value="asian">Asian</MenuItem>
                        <MenuItem value="birman">Birman</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item md={2} sx={{ width: '100px' }}>
                      <Button sx={{ mt: 2, py: 1.9 }} variant="contained" onClick={handleFilterReset}>
                        Reset Filter
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {auth.isLogin() && auth.getRole() === '2' && (
        <Button variant="contained" onClick={() => navigate('/cat/create')}>
          Add Cat
        </Button>
      )}

      {filteredRows.length > 0 && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {filteredRows.map((cat: any) => (
            <Grid item key={cat.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => navigate(`/cat/${cat.id}`)}
              >
                <CardMedia
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}/uploads/${cat.image}`}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {cat.name}
                  </Typography>
                  <Typography>{cat.description}</Typography>
                </CardContent>
                <CardActions>
                  {auth.isLogin() && auth.getRole() === '1' && (
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {filteredRows.length == 0 && <Typography>No Cat</Typography>}
    </Container>
  );
}

export default HomePage;
