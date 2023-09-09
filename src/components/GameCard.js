import React from "react";

const GameCard = ({ card, onClick, isOpened, isInactive, index }) => {
  return (
    <>
      <div
        onClick={() => {
          onClick(index);
        }}
        className="game-card" 
      >
        <div className={`game-card-inner ${isOpened | isInactive ? "game-card-flipped" : ""}`}>
          <div className="game-card-front">
            <img
              className="game-card-image"
              src="/heroes/card-logo.jpeg"
              alt=""
            />
          </div>
          <div className="game-card-back">
            <img className="game-card-image" src={card?.image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
