import React from 'react';
import { useEffect } from 'react';
import GoogleLoginButton from "../components/GoogleLoginButton";
import GoogleLogoutButton from "../components/GoogleLogoutButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "729034240613-tcafn21qn8h2tm47l1uer6lo84hui2l7.apps.googleusercontent.com";

const GoogleAuth = () => {


// useEffect(()=>{
//     function start() {
//         gapi.client.init({
//             clientId: clientId,
//             scope: "email profile",
//             cookiePolicy:'signle_host_origin',
//         })
//     }
//     gapi.load('client:auth2', start);
// });

//var accessToken = gapi.auth.getToken().access_token;

  return (
    <div>
       <GoogleOAuthProvider clientId={clientId}>
        <GoogleLoginButton />
        <GoogleLogoutButton />
        </GoogleOAuthProvider>
    </div>
  )
}

export default GoogleAuth