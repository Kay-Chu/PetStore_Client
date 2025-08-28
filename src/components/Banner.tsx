import React from 'react';
import bannerImg from "../assets/homepage/banner.png";

export const Banner = ({bannerTitle} : {bannerTitle: string}) => {
  return (
   <>
    {/* Banner */}
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={bannerImg}
            alt="Pet Shelter Banner"
            className="w-full h-full object-cover object-right-top"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              {bannerTitle}
            </h1>
          </div>
        </div>
   </>
  )
}
