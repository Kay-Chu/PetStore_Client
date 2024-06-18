import React, { useState } from 'react';
import GoogleLogout from 'react-google-login';

const clientId = "729034240613-tcafn21qn8h2tm47l1uer6lo84hui2l7.apps.googleusercontent.com";

const GoogleLogoutButton = () => {
    
const onSuccess = (res) => {
    console.log("login success!")
}

const onFailure = (res) => {
    console.log("login failed!")
}

    return (
        <div id="signOutButton" >
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onSuccess={onSuccess}
            />
        </div>
    );
};

export default GoogleLogoutButton;
