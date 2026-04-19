import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [memberProfile, setMemberProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [myPublications, setMyPublications] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch member profile
      api.get('members/profile/')
        .then(response => setMemberProfile(response.data))
        .catch(error => console.error('Error fetching profile:', error));

      // Fetch user's events
      api.get('events/my/')
        .then(response => setMyEvents(response.data))
        .catch(error => console.error('Error fetching events:', error));

      // Fetch user's publications
      api.get('publications/my/')
        .then(response => setMyPublications(response.data))
        .catch(error => console.error('Error fetching publications:', error));
    }
  }, [user]);

  if (!user) return <Typography>Please log in to access the dashboard.</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile
              </Typography>
              {memberProfile ? (
                <div>
                  <Typography>Name: {memberProfile.first_name} {memberProfile.last_name}</Typography>
                  <Typography>Email: {memberProfile.email}</Typography>
                  <Typography>Membership: {memberProfile.membership_type}</Typography>
                  <Button component={Link} to="/profile/edit" variant="outlined" sx={{ mt: 2 }}>
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <Typography>Loading profile...</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Events
              </Typography>
              <List>
                {myEvents.slice(0, 5).map(event => (
                  <ListItem key={event.id}>
                    <ListItemText primary={event.title} secondary={new Date(event.start_date).toLocaleDateString()} />
                  </ListItem>
                ))}
              </List>
              <Button component={Link} to="/events" variant="outlined">
                View All Events
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Publications
              </Typography>
              <List>
                {myPublications.slice(0, 5).map(pub => (
                  <ListItem key={pub.id}>
                    <ListItemText primary={pub.title} secondary={pub.status} />
                  </ListItem>
                ))}
              </List>
              <Button component={Link} to="/publications" variant="outlined">
                View All Publications
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {user.roles && user.roles.some(role => role.name === 'admin' || role.name === 'reviewer') && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Admin Actions
                </Typography>
                <Button component={Link} to="/admin/events" variant="contained" sx={{ mr: 2 }}>
                  Manage Events
                </Button>
                <Button component={Link} to="/admin/publications" variant="contained" sx={{ mr: 2 }}>
                  Manage Publications
                </Button>
                <Button component={Link} to="/admin/members" variant="contained">
                  Manage Members
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
