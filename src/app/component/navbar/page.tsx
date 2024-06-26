// components/Navbar.tsx
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Logout from '@/app/logout/page';
import { styled } from '@mui/material/styles';

const StyledNavbar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#2196f3', // Màu nền xanh blue
  color: 'white',
});

const StyledNavLinks = styled('div')({
  display: 'flex',
  gap: '10px',
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '1rem',
  color: 'black',
  backgroundColor: 'white' // Màu chữ mặc định cho nút
});

const StyledSignInButton = styled(Button)({
  backgroundColor:'#2196f3',
  textTransform: 'none',
  color: 'white',
  fontSize: '1em',
});

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <StyledNavbar>
      <StyledNavLinks>
        <Link href="/login" passHref>
          <StyledSignInButton variant="contained">
            Sign in
          </StyledSignInButton>
        </Link>
        <Link href="/register" passHref>
          <StyledButton variant="contained">
            Sign up
          </StyledButton>
        </Link>
      </StyledNavLinks>
      <div style={{ marginLeft: 'auto' }}>
        <Logout />
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
