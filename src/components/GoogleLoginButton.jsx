import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

const clientId = "729034240613-tcafn21qn8h2tm47l1uer6lo84hui2l7.apps.googleusercontent.com";

const GoogleLoginButton = () => {
    
const onSuccess = (res) => {
    console.log("login success!res:", res)
}

const onFailure = (res) => {
    console.log("login failed!:res:", res)
}

    return (
        <div id="signInButton">
            <GoogleLogin 
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'signle_host_origin'}
            isSignedIn={true}
            />
        </div>
    );
};

export default GoogleLoginButton;
