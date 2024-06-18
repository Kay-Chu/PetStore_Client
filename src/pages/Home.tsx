// import React from 'react';
// import Article from './Articles';
// const Home = () => {
//   return (<>
//
//         <Article />
//   </>)
// }

// export default Home;

// Home.jsx
// Home.jsx
import React, { useState } from "react";
import Articles from "../components/Articles";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");
  return (
    <>
      <div className="container">
        <div className="center_content">
          <h2 style={{ color: "#135200", marginLeft: "25px" }}>
            <strong>Pet shelter</strong>
          </h2>

          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setFilter={setFilter}
            filter={filter}
          />
        </div>
        <Articles searchInput={searchInput} filter={filter} />
      </div>
    </>
  );
};

export default Home;
