import React, { useState } from "react";
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

const Home = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
  return (
    <div>
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
    </div>
  );
};

export default Home;
