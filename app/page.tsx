'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RecipeItem from '@/components/RecipeItem';
import "../styles/main.scss";
import Filter_Icon from '@/public/assets/svgs/filter_icon-dark.svg';
import Fruit_Icon from '@/public/assets/svgs/fruit_icon.svg'

export default function Home() {
  const [isFilterPopupVisible, setFilterPopupVisible] = useState(false);
  const [filter, setFilter] = useState({ halal: false, vegan: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manages login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const recipes = [
    { image: "/assets/images/chicken_alfredo_img.PNG", title: "Chicken Alfredo", time: "30 mins", link: "/recipe-instructions", halal: true, vegan: false },
    { image: "/assets/images/roast_beef_img.jpg", title: "Roast Beef", time: "22 mins", link: "/recipe-instructions", halal: false, vegan: false },
    { image: "/assets/images/fruit_salad_img.jpg", title: "Fruit Salad", time: "8 mins", link: "/recipe-instructions", halal: true, vegan: true },
    { image: "/assets/images/milk_shake_img.jpg", title: "Milk Shake", time: "11 mins", link: "/recipe-instructions", halal: true, vegan: false },
    { image: "/assets/images/pulled_pork_img.jpg", title: "Pulled Pork", time: "32 mins", link: "/recipe-instructions", halal: false, vegan: false },
    { image: "/assets/images/beef_burger_img.PNG", title: "Beef Burger", time: "16 mins", link: "/recipe-instructions", halal: true, vegan: false },
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
    return true;
  });


  // Handle login form submission
  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoggedIn(true);
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <main className="home page-margins">

      {/* LOGIN SIMULATOR */}
      {!isLoggedIn && (
        <div className="login">
          <Image
            src={Fruit_Icon}
            alt="Fruit Icon"
            unoptimized={true}
            className="login__icon"
          />
          <h1 className="login__header">- Log In -</h1>
          <form onSubmit={handleLoginSubmit} className="login__form">
            <div className="login__field">
              <label htmlFor="email" className="login__label">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login__input"
                required
              />
            </div>
            <div className="login__field">
              <label htmlFor="password" className="login__label">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login__input"
                required
              />
            </div>
            <button type="submit" className="login__button">Login</button>
          </form>
        </div>
      )}

      <h1 className="home__welcome-header">Welcome Back!</h1>

      {/* Today's Suggestions */}
      <div className="home__suggestions suggestions">
        <div className="suggestions__header">
          <h2 className="suggestions__header_text">Today's Suggestions</h2>
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
