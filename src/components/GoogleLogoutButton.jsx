// GoogleLogoutButton.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google'; 
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const GoogleLogoutButton = ({ onSuccess, onFailure }) => {
  const handleLogout = () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_profile');
      
      window.location.href = `https://accounts.google.com/logout`;
      
      console.log('Logout Success');
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (error) {
      console.error('Logout Failed:', error);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      icon={<LogoutOutlined />}
      type="primary" 
      danger
      size="large"
      className='m-2'
    >
      Sign Out
    </Button>
  );
};

export default GoogleLogoutButton;