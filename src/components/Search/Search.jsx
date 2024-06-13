import React, { useContext, useState } from "react";
import "./search.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";


const Search = () => {
  const { isDarkTheme, setIsSearch, searchQuery, setSearchQuery } =
    useContext(StoreContext);
  return (
    <div className="search">
      <div className="search-field">
        <input
          type="text"
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          style={{ color: isDarkTheme ? "white" : "black" }}
        />
        <img
          src={assets.search_icon}
          className="close-icon"
          alt="search_icon"
          onClick={() => {
            setIsSearch(false);
            setSearchQuery("")
          }}
        />
      </div>
    </div>
  );
};

export default Search;
