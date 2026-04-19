import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('publications/')
      .then(response => {
        setPublications(response.data);
      })
      .catch(error => {
        console.error('Error fetching publications:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Publications
      </Typography>
      <Grid container spacing={3}>
        {publications.map(pub => (
          <Grid item xs={12} md={6} lg={4} key={pub.id}>
            <Card>
              {pub.cover_image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={pub.cover_image}
                  alt={pub.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {pub.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {pub.summary ? pub.summary.substring(0, 100) + '...' : 'No summary available'}
                </Typography>
                {pub.category && <Chip label={pub.category.name} size="small" sx={{ mt: 1 }} />}
                <Button component={Link} to={`/publications/${pub.id}`} variant="outlined" sx={{ mt: 2 }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Publications;
