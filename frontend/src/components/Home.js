import React from 'react';
import { Button, Card, Text } from '@nextui-org/react';

function Home() {
  return (
    <Card className="p-6">
      <Text h1 className="mb-4">Welcome to the Commission Tracking App</Text>
      <Button href={process.env.REACT_APP_DISCORD_LOGIN_URL} variant="shadow" size="lg">
        Login with Discord
      </Button>
    </Card>
  );
}

export default Home;
