'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RecipeItem from '@/components/RecipeItem';
import "../styles/main.scss";
import Filter_Icon from '@/public/assets/svgs/filter_icon-dark.svg';

export default function Home() {
  
  const [isFilterPopupVisible, setFilterPopupVisible] = useState(false);
  const [filter, setFilter] = useState({ halal: false, vegan: false });
  const [searchQuery, setSearchQuery] = useState("");

  const recipes = [
    { image: "/assets/images/chicken_alfredo_img.PNG", title: "Chicken Alfredo", time: "30 mins", link: "/recipe-instructions", halal: true, vegan: false },
    { image: "/assets/images/roast_beef_img.jpg", title: "Roast Beef", time: "22 mins", link: "/recipe-instructions", halal: false, vegan: false },
    { image: "/assets/images/fruit_salad_img.jpg", title: "Fruit Salad", time: "8 mins", link: "/recipe-instructions", halal: true, vegan: true },
    { image: "/assets/images/milk_shake_img.jpg", title: "Milk Shake", time: "11 mins", link: "/recipe-instructions", halal: true, vegan: false },
    { image: "/assets/images/pulled_pork_img.jpg", title: "Pulled Pork", time: "32 mins", link: "/recipe-instructions", halal: false, vegan: false },
    { image: "/assets/images/beef_burger_img.jpg", title: "Beef Burger", time: "16 mins", link: "/recipe-instructions", halal: true, vegan: false },
    { image: "/assets/images/tuna_salad_img.jpg", title: "Tuna Salad", time: "14 mins", link: "/recipe-instructions", halal: true, vegan: false },
  ];

  // Toggle popup visibility
  const toggleFilterPopup = () => {
    setFilterPopupVisible((prev) => !prev);
  };

  // Handle filter changes
  const handleFilterChange = (filterType: 'halal' | 'vegan') => {
    setFilter((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // Filter recipes based on selected options
  const filteredRecipes = recipes.filter((recipe) => {
    if (filter.halal && !recipe.halal) return false;
    if (filter.vegan && !recipe.vegan) return false;
    if (searchQuery && !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="home page-margins">

      <h1 className="home__welcome-header">Welcome Back!</h1>

      {/* Suggested Recipes */}
      <h2 className="home__header">Today&apos;s Suggestions</h2>
      <div className="home__suggestions suggestions">
        <div className="suggestions__header">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="suggestions__header_search-bar"
          />
          <div
            className="suggestions__header_filter"
            onClick={toggleFilterPopup}
          >
            <p className="suggestions__header_filter-text">Filter</p>
            <Image
              src={Filter_Icon}
              alt="Filter Icon"
              unoptimized={true}
              className="suggestions__header_filter-icon"
            />
          </div>
        </div>

        {/* Filter Popup */}
        {isFilterPopupVisible && (
          <div className="filter-popup-container">
            <div className="filter-popup">
              <h3 className="filter-popup__title">Filter By:</h3>
              <div className="filter-popup__options">
                <label className="filter-popup__options_label">
                  <input
                    type="checkbox"
                    checked={filter.halal}
                    onChange={() => handleFilterChange('halal')}
                    className="filter-popup__options_label-input"
                  />
                  Halal
                </label>
                <label className="filter-popup__options_label">
                  <input
                    type="checkbox"
                    checked={filter.vegan}
                    onChange={() => handleFilterChange('vegan')}
                    className="filter-popup__options_label-input"
                  />
                  Vegan
                </label>
                <button onClick={toggleFilterPopup} className="filter-popup__options_close">Close</button>
              </div>
            </div>
          </div>
        )}

        <div className="suggestions__container">
          {filteredRecipes.map((recipe, index) => (
            <RecipeItem
              key={index}
              image={recipe.image}
              title={recipe.title}
              time={recipe.time}
              link={recipe.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
