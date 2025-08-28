
import React from "react";
import Landing from "../components/Landing";
import { Banner } from "../components/Banner";


const Dashboard = () => {
  return (
    <>
      <div>

        <Banner bannerTitle="Dashboard" />
        <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Left side: Landing component */}
          <div className="md:w-2/3 bg-white rounded-lg shadow p-4">
            <Landing />
          </div>

          {/* Right side: vertical column */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow p-4 flex-1">
              {/* Example widget */}
              <h1 className="font-semibold mb-2">Mission</h1>
              <p>Every pet deserves love, care, and a home. At here, we’ve seen countless animals transform from shy, scared shelter residents into confident, happy companions. Today, we want to share Max’s inspiring story—a testament to the power of love and second chances.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex-1">
              <h1 className="font-semibold mb-2">Vision</h1>
              <p>Through playtime, training, and socialization, Max gradually opened up. Our volunteers celebrated every milestone: first tail wag, first fetch, first joyful bark. Max’s transformation reminded everyone that every animal, no matter how scared, can thrive with love.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
