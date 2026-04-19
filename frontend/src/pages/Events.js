import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <Grid container spacing={3}>
        {events.map(event => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card>
              {event.banner && (
                <CardMedia
                  component="img"
                  height="140"
                  image={event.banner}
                  alt={event.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {event.description.substring(0, 100)}...
                </Typography>
                <Typography variant="body2">
                  {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </Typography>
                <Chip label={event.event_type} size="small" sx={{ mt: 1 }} />
                <Button component={Link} to={`/events/${event.id}`} variant="outlined" sx={{ mt: 2 }}>
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

export default Events;
