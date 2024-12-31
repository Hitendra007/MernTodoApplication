import React, { useEffect } from 'react';
import './profile.css';
import { useAuth } from '../../Context/AuthContext';

function Profile() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div id='profile-div' style={{ height: '70vh', color: 'black', padding: '20px' }}>
      <h1>Profile Page</h1>
      {user ? (
        <div id='details-div'>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
