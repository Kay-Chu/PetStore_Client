//import React from 'react';

import React from "react";

const About = () => {
  // Let's clear the local storage here
  //localStorage.clear();
  return (
    <>
      <div className="container" >
    
        <h2 style={{ color: "#135200"}}>
          <strong>About our Pet shelter</strong>
        </h2>
        <img
          // style={{ width: "900px" }}
          src="/src/assets/shelters.jpeg"
          alt="shelter-img"
          className="profile-img-card"
        />

      </div>
    </>
  );
};

export default About;
