import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  // useGoogleLogin hook
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      if (onSuccess) {
        onSuccess(tokenResponse);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      if (onFailure) {
        onFailure(error);
      }
    },
    scope: 'email profile openid',
  });

  return (
    <Button 
      onClick={() => login()} 
      icon={<GoogleOutlined />} 
      size="large"
      className=' m-2'
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;