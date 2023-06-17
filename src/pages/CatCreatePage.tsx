import { Box, Button, Container, CssBaseline, TextField, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCat } from '../contexts/CatContext';
import { useNavigate } from 'react-router-dom';
import PhotoUploadWidget from '../components/PhotoUploadWidget';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function CatCreatePage() {
  const navigate = useNavigate();
  let auth = useAuth();
  const cat = useCat();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePhotoUpload = async (file: Blob) => {
    const fileName = await cat.uploadCat(file);
    formik.setFieldValue('image', fileName);
  };

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

  const formik = useFormik({
    initialValues: {
      user: auth.getID(),
      name: '',
      breed: '',
      age: '',
      description: '',
      image: ''
    },
    validationSchema: Yup.object({
      user: Yup.string().max(99).required(),
      name: Yup.string().max(99).required(),
      breed: Yup.string().max(99).required(),
      age: Yup.string().required(),
      description: Yup.string().max(99).required(),
      image: Yup.string().max(99)
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const result = await cat.createCat(values);
      if (result === 'Success') {
        setSubmitting(false);
        navigate('/');
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Create Cat
        </Typography>
      </Box>
      <Box>
        <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Cat Name"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cat Breed"
            id="breed"
            name="breed"
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.breed}
            error={formik.touched.breed && Boolean(formik.errors.breed)}
            helperText={formik.touched.breed && formik.errors.breed}
          >
            {cat_breed.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Cat Age"
            id="age"
            name="age"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.age}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cat Description"
            id="description"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          {formik.values.image == '' ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={isLoading} />
          ) : (
            <img src={`${import.meta.env.VITE_API_URL}/uploads/${formik.values.image}`} width="200" loading="lazy" />
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
