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
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cat } from '../models/Cat';
import { useCat } from '../contexts/CatContext';
import AlignItemsList from '../components/AlignItemsList';
import { useFavourite } from '../contexts/FavouriteContext';
import { Favourite } from '../models/Favourite';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../contexts/AuthContext';

export default function FavouritePage() {
  const navigate = useNavigate();
  let auth = useAuth();
  let favourite = useFavourite();

  const cat_breed = [
    {
      label: 'Siamese',
      value: 'Siamese'
    },
    {
      label: 'Persian',

      value: 'Persian'
    },
    {
      label: 'British Shorthair',
      value: 'British Shorthair'
    },
    {
      label: 'Scottish Fold',
      value: 'Scottish Fold'
    },
    {
      label: 'American Shorthair',
      value: 'American Shorthair'
    },
    {
      label: 'Sphynx',

      value: 'Sphynx'
    },
    {
      label: 'Birman',

      value: 'Birman'
    },
    {
      label: 'Maine Coon',

      value: 'Maine Coon'
    },
    {
      label: 'Russian Blue',
      value: 'Russian Blue'
    },
    {
      label: 'Munchkin',

      value: 'Munchkin'
    }
  ];

  const [favouiteList, setFavouiteList] = useState<Favourite[]>([]);

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

  const handleOnClick = async (id: number) => {
    navigate(`/cat/${id}`);
    const result = await favourite.listFavourite();
    if (!(result.filter((x: any) => x['cat']['id'] == id).length > 0)) {
      favourite.createFavourite({ user: auth.getID(), cat: id.toString() });
    }
  };

  const filteredRows = favouiteList.filter((item) => {
    if (filterSearchValue.length == 0 && filterBreedValue == '') {
      return true;
    }
    if (filterSearchValue.length > 0 && filterBreedValue == '') {
      console.log(
        item.cat.name.toLowerCase(),
        filterSearchValue.toLowerCase(),
        item.cat.name.toLowerCase().includes(filterSearchValue.toLowerCase())
      );
      return item.cat.name.toLowerCase().includes(filterSearchValue.toLowerCase());
    }
    if (filterSearchValue.length == 0 && filterBreedValue != '') {
      return item.cat.breed.toString() == filterBreedValue;
    }
    if (filterSearchValue.length > 0 && filterBreedValue != '') {
      return (
        item.cat.name.toLowerCase().includes(filterSearchValue.toLowerCase()) &&
        item.cat.breed.toString() == filterBreedValue
      );
    }
    return false;
  });

  const initFavouiteList = async () => {
    const result = (await favourite.listFavourite()).filter((x: any) => x['status'] == '1');
    setFavouiteList(result);
  };
  useEffect(() => {
    initFavouiteList();
  }, []);

  return (
    <Container>
      <Typography variant={'h2'}>My Favourite</Typography>
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
                        {cat_breed.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
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

      {filteredRows.length > 0 && (
        <Grid container sx={{ pt: 2 }} spacing={2}>
          {filteredRows.map((favourite: any) => (
            <Grid item key={favourite.cat.id} xs={12} sm={6} md={2}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => handleOnClick(favourite.cat.id)}
              >
                <CardMedia
                  component="img"
                  image={`${import.meta.env.VITE_API_URL}/uploads/${favourite.cat.image}`}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {favourite.cat.name}
                  </Typography>
                  <Typography>{favourite.cat.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {filteredRows.length == 0 && <Typography>No Cat</Typography>}
    </Container>
  );
}
