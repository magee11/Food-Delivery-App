import React, { useContext, useState } from "react";
import "./home.css";
import ExporeMenu from "../../components/ExploreMenu/ExporeMenu";
import Header from "../../components/Header/Header";
import DisplayFood from "../../components/DisplayFood/DisplayFood";
import Offers from "../../components/Offers/Offers";
import AppDownload from "../../components/AppDownload/AppDownload";
import { StoreContext } from "../../context/StoreContext";
import SearchResult from "../../components/SearchResult/SearchResult";

const Home = () => {
  const [category, setCategory] = useState("All");
  const { searchQuery, isSearch } = useContext(StoreContext);

  if (isSearch && searchQuery.trim().length > 0) return <SearchResult />;

  return (
    <>
      <Header />
      <Offers />
      <ExporeMenu category={category} setCategory={setCategory} />
      <DisplayFood category={category} />
      <AppDownload />
    </>
  );
};

export default Home;
