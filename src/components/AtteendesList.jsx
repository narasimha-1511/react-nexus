import React, { useState, useMemo } from 'react';
import {
  Container,
  TextField,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled TextField
const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  '& .MuiInputLabel-root': {
    color: '#666',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

function AttendeeList({ attendees , speakers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttendees, setShowAttendees] = useState(true);

  // Filter attendees or speakers based on search query
  const filteredAttendees = useMemo(() => {
    return attendees.filter(attendee =>
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [attendees, searchQuery]);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter(speaker =>
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [speakers, searchQuery]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold', marginTop: 4 }}>
        ReactNexus
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <ButtonGroup variant="contained">
          <Button onClick={() => setShowAttendees(true)}>Attendees</Button>
          <Button onClick={() => setShowAttendees(false)}>Speakers</Button>
        </ButtonGroup>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <StyledTextField
          label={`Search ${showAttendees ? 'attendees' : 'speakers'}`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: '50%' }}
        />
      </Box>
      <Grid container spacing={3}>
        {showAttendees ? (
          filteredAttendees.map(attendee => (
            <Grid item xs={12} sm={6} md={4} key={attendee.id}>
              <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fafafa', borderRadius: 2 }}>
                <ListItem>
                  <Avatar alt={attendee.name} src={(attendee.gender == "Male") ? `https://avatar.iran.liara.run/public/boy?name=${attendee.name}` : `https://avatar.iran.liara.run/public/girl?name=${attendee.name}`} />
                  <ListItemText
                    primary={attendee.name}
                    secondary={attendee.company}
                    primaryTypographyProps={{ color: 'primary', fontWeight: 'bold' }}
                    secondaryTypographyProps={{ color: 'textSecondary' }}
                    sx={{ marginLeft: 2 }}
                  />
                </ListItem>
              </Paper>
            </Grid>
          ))
        ) : (
          filteredSpeakers.map(speaker => (
            <Grid item xs={12} sm={6} md={4} key={speaker.id}>
              <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fafafa', borderRadius: 2 }}>
                <ListItem>
                  <Avatar alt={speaker.name} src={speaker.picture} />
                  <ListItemText
                    primary={speaker.name}
                    secondary={speaker.company}
                    primaryTypographyProps={{ color: 'primary', fontWeight: 'bold' }}
                    secondaryTypographyProps={{ color: 'textSecondary' }}
                    sx={{ marginLeft: 2 }}
                  />
                </ListItem>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default AttendeeList;
