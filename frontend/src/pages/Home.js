import React from 'react';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to MAOMS
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary">
          Mongolian Association of Oral and Maxillofacial Surgeons
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Events
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Stay updated with our latest events and conferences.
            </Typography>
            <Button component={Link} to="/events" variant="contained" sx={{ mt: 2 }}>
              View Events
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Publications
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Access our research and publications.
            </Typography>
            <Button component={Link} to="/publications" variant="contained" sx={{ mt: 2 }}>
              View Publications
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Download resources and guidelines.
            </Typography>
            <Button component={Link} to="/resources" variant="contained" sx={{ mt: 2 }}>
              View Resources
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
