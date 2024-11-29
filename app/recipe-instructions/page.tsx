'use client';

import React, { useState, useEffect } from 'react';
import "../../styles/main.scss";
import Image from 'next/image';
import Banner_Image from '@/public/assets/images/beef_burger_img.jpg';

const RecipeInstructionsPage = () => {
  const [cookingStarted, setCookingStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Buns', quantity: 2 },
    { id: 2, name: 'Ground Beef', quantity: 2 },
    { id: 3, name: 'Lettuce', quantity: 2 },
    { id: 4, name: 'Tomatoes', quantity: 2 },
    { id: 5, name: 'Cheese', quantity: 2 },
    { id: 6, name: 'Cooking Oil', quantity: 2 },
    { id: 7, name: 'Salt', quantity: 2 },
    { id: 8, name: 'Chili Powder', quantity: 2 },
    { id: 9, name: 'Beef Seasoning', quantity: 2 },
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cookingStarted) {
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cookingStarted]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleStart = () => {
    setCookingStarted(true);
    setElapsedTime(0);
  };

  const handleStop = () => {
    setCookingStarted(false);
  };

  const handleUpdateInventory = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  return (
    <div className="instructions page-margins">
      <div className="instructions__banner">
        <Image
          src={Banner_Image}
          alt="Beef Burger"
          unoptimized={true}
          className="instructions__banner_img"
        />
      </div>

      <h1 className="instructions__header">Beef Burger</h1>
      <h3 className="instructions__time-length"><span className="instructions__time-length_span">Time: </span>22mins</h3>

      <h3 className="instructions__title">Ingredients:</h3>
      <ul className="instructions__ingredients-list">
        {inventory.map((item) => (
          <li key={item.id} className="instructions__ingredients-list--item">
            {item.name}
          </li>
        ))}
      </ul>

      <h3 className="instructions__title">Cooking Instructions:</h3>
      <p className="instructions__description">
        To make a delicious beef burger, start by forming the ground beef into patties...
      </p>

      {/* Start Button */}
      {!cookingStarted && (
        <button onClick={handleStart} className="instructions__btn-start btn btn-primary">
          Start
        </button>
      )}

      {/* Cooking Started */}
      {cookingStarted && (
        <div className="instructions__cooking">
          <p className="instructions__cooking_time-elapsed">
            Time Elapsed: {formatTime(elapsedTime)}
          </p>
          <div className="instructions__cooking_buttons">
            <button onClick={handleUpdateInventory} className="instructions__cooking_buttons-btn btn btn-primary">
              Update Inventory
            </button>
            <button onClick={handleStop} className="instructions__cooking_buttons-btn btn btn-stop">
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Inventory Pop-up */}
      {showPopup && (
        <div className="instructions__inventory-background">
          <div className="instructions__inventory">
            <h3 className="instructions__inventory_header">Update Inventory</h3>
            <div className="instructions__inventory_scroll-container">
              <ul className="instructions__inventory_list">
                {inventory.map((item) => (
                  <li key={item.id} className="instructions__inventory_list-item">
                    <span className="instructions__inventory_list-item--name">{item.name}</span>
                    <input
                      type="number"
                      className="instructions__inventory_list-item--quantity"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handlePopupClose} className="instructions__inventory_close-btn btn btn-primary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeInstructionsPage;
