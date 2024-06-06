import React, { useContext, useState } from "react";
import "./search.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import {food_list} from '../../assets/frontend_assets/assets';

const Search = ({ setSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkTheme } = useContext(StoreContext);
  const foodNames = food_list.map((item)=>item.name)
  const foodName = [
    "Avocado Toast",
    "Banana Bread",
    "Cauliflower Rice",
    "Dumplings",
    "Eggplant Parmesan",
    "Falafel",
    "Gnocchi",
    "Hummus",
    "Ice Cream Sundae",
    "Jambalaya",
    "Kale Salad",
    "Lasagna",
    "Mango Smoothie",
    "Nachos",
    "Oatmeal Cookies",
    "Pancakes",
    "Quinoa Salad",
    "Ratatouille",
    "Sushi",
    "Tiramisu",
    "Udon Noodles",
    "Vegetable Stir Fry",
    "Waffles",
    "Xiao Long Bao",
    "Yogurt Parfait",
    "Zucchini Bread",
  ];
  const navigate = useNavigate()

  return (
    <div className="search">
      <div className="search-field">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          style={{ color: isDarkTheme ? "white" : "black" }}
        />
        <img src={assets.search_icon} className="close-icon" />
      </div>
      <div className="suggestion">
        {searchQuery &&
          foodNames
            .filter((item) => {
              const lowerCaseItem = item.toLowerCase();
              const lowerCaseSearchQuery = searchQuery.toLowerCase();
              if (!lowerCaseItem.includes(lowerCaseSearchQuery)) {
                return false;
              }
              for (let char of lowerCaseSearchQuery) {
                if (!lowerCaseItem.includes(char)) {
                  return false;
                }
              }
              return true;
            })
            .slice(0, 7)
            .map((item, index) => (
              <div
                key={index}
                style={{ color: isDarkTheme ? "white" : "black" }}
                className="suggestion-items"
                onClick={()=>navigate(`/product/${item}`)}
              >
                <p>{item}</p>
              </div>
            ))}
      </div>
      <div className="close-right">
        <img src={assets.sidebar_exit} onClick={() => setSearch(false)} />
      </div>
    </div>
  );
};

export default Search;
