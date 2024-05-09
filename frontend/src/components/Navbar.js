import React, { useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../slices/authSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UserProfile from './UserProfile';
import { AcmeLogo } from './AcmeLogo';
import LogoutIcon from './icons/LogoutIcon';
import ThemeSwitch from './ThemeSwitcher';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const fetchUser = async (token) => {
    try {
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded.user));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Button as={Link} href='/'>
          Home
        </Button>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Link color='foreground' href='/orders'>
            Orders
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {isAuthenticated && user ? (
          <>
            <UserProfile
              username={user.username}
              email={user.email}
              avatar={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
            />
            <NavbarItem>
              <Button as={Link} href='/account'>
                Account
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                color='warning'
                variant='faded'
                aria-label='Logout'
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color='primary'
              href={process.env.REACT_APP_DISCORD_LOGIN_URL}
              variant='flat'
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
