import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="xl" />
    </div>
  );
}

export default Login;
