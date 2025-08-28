import 'antd/dist/reset.css';
import { Card } from 'antd';
import React from 'react';
import landingImg from "../assets/dashboard/landing.png";

const BriefArticle = () => {
  return (
    <div className="flex justify-center mt-8">
      <Card
        className="relative w-80 bg-white shadow-lg rounded-xl overflow-visible"
        bodyStyle={{ paddingTop: '4rem', paddingBottom: '1.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {/* Protruding Image */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white">
          <img src={landingImg} alt="Pet" className="w-full h-full object-cover" />
        </div>

        {/* Card Content */}
        <h2 className="text-xl font-bold text-center mt-2">Find a Friend, Save a Life</h2>
        <p className="text-gray-600 text-center mt-2">
          Meet our adorable pets! Each adoption gives a furry friend a second chance at life. Browse, fall in love, and adopt today!
        </p>
      </Card>
    </div>
  );
};

export default BriefArticle;
