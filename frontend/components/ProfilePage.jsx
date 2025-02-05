// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { supabase } from './supabaseClient';

const ProfilePage = () => {
  // State to store the authenticated user
  const [user, setUser] = useState(null);
  // Local state for the profile form. Initially, only email is known.
  const [profile, setProfile] = useState({
    email: '',
    name: '',
    contact: '',
    age: '',
    bio: '',
  });
  // Loading state for async operations.
  const [loading, setLoading] = useState(false);
  // State to control whether the form is in edit mode.
  const [isEditing, setIsEditing] = useState(false);

  // When the component mounts, fetch the current user and load profile details.
  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Set email from the authenticated user
        setProfile((prev) => ({ ...prev, email: user.email }));
        await fetchProfile(user);
      }
    };
    getUserAndProfile();
  }, []);

  // Fetch profile info from the "profiles" table.
  // If no row exists for the user, create one.
  const fetchProfile = async (user) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      // If no profile exists, insert one with the user's email.
      if (!data) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, email: user.email }])
          .select()
          .maybeSingle();
        if (insertError) throw insertError;
        data = newProfile;
      }

      setProfile({
        email: data.email || user.email,
        name: data.name || '',
        contact: data.contact || '',
        age: data.age || '',
        bio: data.bio || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  // Handle changes in the profile form fields.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile details in the "profiles" table.
  const handleProfileUpdate = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          contact: profile.contact,
          age: profile.age,
          bio: profile.bio,
        })
        .eq('id', user.id);
      if (error) throw error;
      console.log('Profile updated:', data);
      // Exit edit mode after successful update.
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Revert changes and exit edit mode.
  const handleCancelEdit = async () => {
    if (!user) return;
    await fetchProfile(user);
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
        {/* Email (from signup) is displayed in read-only mode */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={profile.email}
          disabled
          margin="normal"
        />
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Contact Details"
          name="contact"
          value={profile.contact}
          onChange={handleInputChange}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={profile.age}
          onChange={handleInputChange}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={profile.bio}
          onChange={handleInputChange}
          multiline
          rows={4}
          margin="normal"
          disabled={!isEditing}
        />
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProfileUpdate}
              disabled={loading}
              sx={{ mt: 2, mr: 2 }}
            >
              {loading ? 'Updating...' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
