'use client'
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';

const Logout= () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); 
    router.push('/');
  };

  return (
    <ListItem button onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', mt: 4, color: 'white'}}>
      <ListItemIcon sx={{ minWidth: 35 }}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );
};

export default Logout;
