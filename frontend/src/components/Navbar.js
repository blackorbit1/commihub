import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import UserProfile from "./UserProfile";
import { AcmeLogo } from "./AcmeLogo";

export default function CustomNavbar() {
  const [user, setUser] = useState(null);

  const fetchUser = async (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUser(token);
    }
  }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Commission Tracking</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <UserProfile
            username={user.username}
            email={user.email}
            avatar={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
          />
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href={process.env.REACT_APP_DISCORD_LOGIN_URL}
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
