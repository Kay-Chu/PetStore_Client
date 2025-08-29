import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import axios from 'axios';
import { TokenResponse } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onLoginSuccess?: (token: string, user: any) => void;
  onLoginFailure?: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onLoginSuccess,
  onLoginFailure,
}) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const token = tokenResponse.access_token; // always defined here
        // const res = await axios.post('/api/v1/users/google', { token });
  
        // console.log('Backend response:', res.data);
        // message.success('Login successful!');
  
        // if (onLoginSuccess) {
        //   onLoginSuccess(res.data.token, res.data.user);
        // }
        // console.log(token)
        axios.post('/api/v1/users/google', { token: token })
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
      } catch (err) {
        console.error('Login failed:', err);
        message.error('Login failed. Please try again.');
        if (onLoginFailure) onLoginFailure(err);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      message.error('Google login failed. Please try again.');
      if (onLoginFailure) onLoginFailure(error);
    },
    flow: 'implicit', // or 'auth-code' if you want server-side flow
    scope: 'openid email profile',
  });

  return (
    <Button
      onClick={() => login()}
      icon={<GoogleOutlined />}
      size="large"
      className="m-2"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
