// Home.jsx
import React, { useState } from "react";
import Articles from "../components/Articles";
import SearchBar from "../components/SearchBar";
import bannerImg from "../assets/homepage/banner.png";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={bannerImg}
          alt="Pet Shelter Banner"
          className="w-full h-full object-cover object-right-top"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Pet Shelter
          </h1>
        </div>
      </div>


      {/* Search Section */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="my-6">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setFilter={setFilter}
            filter={filter}
          />
        </div>

        {/* Articles Section */}
        <Articles searchInput={searchInput} filter={filter} />
      </div>
    </div>
  );
};

export default Home;
