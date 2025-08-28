// Home.jsx
import React, { useState } from "react";
import Articles from "../components/Articles";
import SearchBar from "../components/SearchBar";
import { Banner } from "../components/Banner";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Banner bannerTitle='Pet Shlter' />


      {/* Search Section */}
      <div className="max-w-7xl mx-auto p-10">
        <div>
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
