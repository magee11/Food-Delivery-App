import React, { useContext } from "react";
import "./search.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";

const Search = ({ autoFocus = true }) => {
  const { setIsSearch, searchQuery, setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onChange = (e) => {
    setSearchQuery(e.target.value);
    // Results render on the home page.
    if (pathname !== "/") navigate("/");
  };

  const close = () => {
    setIsSearch(false);
    setSearchQuery("");
  };

  return (
    <div className="search">
      <Icon name="search" size={18} className="search-lead" />
      <input
        type="search"
        className="search-input"
        placeholder="Search paneer, cake, pasta…"
        onChange={onChange}
        onKeyDown={(e) => e.key === "Escape" && close()}
        value={searchQuery}
        autoFocus={autoFocus}
        aria-label="Search dishes"
      />
      <button className="search-close" onClick={close} aria-label="Close search">
        <Icon name="close" size={16} />
      </button>
    </div>
  );
};

export default Search;
