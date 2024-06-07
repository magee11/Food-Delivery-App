import React, { useContext, useState } from "react";
import ExporeMenu from "../../components/ExploreMenu/ExporeMenu";
import Header from "../../components/Header/Header";
import DisplayFood from "../../components/DisplayFood/DisplayFood";
import AppDownload from "../../components/AppDownload/AppDownload";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { StoreContext } from "../../context/StoreContext";
import SearchResult from "../../components/SearchResult/SearchResult";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [category, setCategory] = useState("All");  
  const { searchQuery, isSearch } = useContext(StoreContext);
  console.log(searchQuery, "SearchQuery");
  return (
    <div>
      {searchQuery.length > 0 && isSearch ? (
        <SearchResult />
      ) : (
        <>
          <ToastContainer />
          <Element name="header">
            <Header />
          </Element>
          <Element name="menu">
            <ExporeMenu category={category} setCategory={setCategory} />
          </Element>
          <Element name="food">
            <DisplayFood category={category} />
          </Element>
          <Element name="app-download">
            <AppDownload />
          </Element>
        </>
      )}
    </div>
  );
};

export default Home;
