import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [commissioner, setCommissioner] = useState(user?.commissioner || false);

  useEffect(() => {
    if (user) {
      setCommissioner(user.commissioner);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:4000/api/user/commissioner', {
        discordId: user.discordId,
        commissioner,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating commissioner status:', error);
    }
  };

  return (
    <div className='flex flex-col gap-4 p-8'>
      <h2>Account Information</h2>
      <Checkbox isSelected={commissioner} onValueChange={setCommissioner}>
        I am a commissioner
      </Checkbox>
      <Button color='primary' onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default AccountPage;
