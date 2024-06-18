//import React from 'react';
import React from "react";
import Landing from "../components/Landing";

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <h2 style={{ color: "#135200", marginLeft: "25px" }}>
          <strong>Dashboard</strong>
        </h2>
        <Landing />
      </div>
    </>
  );
};

export default Dashboard;
