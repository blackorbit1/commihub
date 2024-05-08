import React from "react";
import { User } from "@nextui-org/react";

const UserProfile = ({ username, email, avatar }) => {
  return (
    <User
      name={username}
      description={email || "No email provided"}
      avatarProps={{
        src: avatar || "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
    />
  );
};

export default UserProfile;
