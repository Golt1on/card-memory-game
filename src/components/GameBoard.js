import React, { useEffect, useState } from "react";
import { CardList } from "../card-data/card-data";
import GameCard from "../components/GameCard";

const GameBoard = () => {
  const [openedCards, setOpenedCards] = useState([]);
  const [inactiveCards, setInactiveCards] = useState([]);
  const [cards, setCards] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(true);

  useEffect(() => {
    if (openedCards.length === 2) {
      if (cards[openedCards[0]].name == cards[openedCards[1]].name) {
        setInactiveCards([...inactiveCards, ...openedCards]);
        setOpenedCards([]);
      } else {
        setTimeout(() => {
          setOpenedCards([]);
        }, 1000);
      }
    }
  }, [openedCards]);

  useEffect(() => {
    if (inactiveCards?.length == cards?.length) {
      setIsGameFinished(true);
    }
  }, [inactiveCards]);

  const shuffleCards = () => {
    const _cardList = [...CardList];
    const shuffledCards = [];
    while (_cardList.length) {
      const randomIndex = Math.floor(Math.random() * _cardList.length);
      shuffledCards.push(_cardList[randomIndex]);
      _cardList.splice(randomIndex, 1);
    }
    setCards(shuffledCards);
  };

  const handleClick = (index) => {
    if (!isCardOpened(index) && !isCardInactive(index)) {
      setOpenedCards([...openedCards, index]);
    }
  };

  const isCardOpened = (index) => {
    return openedCards.includes(index);
  };

  const isCardInactive = (index) => {
    return inactiveCards.includes(index);
  };

  return (
    <>
      <div className="board-container">
        <h1>Dota 2 Card Memory Game</h1>
        {isGameStarted ? (
          <>
            <div className="game-board">
              {cards?.map((x, i) => {
                return (
                  <>
                    <GameCard
                      card={x}
                      key={i}
                      index={i}
                      isOpened={isCardOpened(i)}
                      isInactive={isCardInactive(i)}
                      onClick={handleClick}
                    />
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                className="start-game-button"
                onClick={() => {
                  setInactiveCards([]);
                  setOpenedCards([]);
                  setIsGameStarted(true);
                  setIsGameFinished(false);
                  shuffleCards();
                }}
              >
                Start Game
              </button>
            </div>
          </>
        )}
        {isGameFinished && isGameStarted && (
          <>
            <div className="finished-game-container">
              <div className="finished-game-content">
                <h2 className="gratz-text">Game has been finished</h2>
                <button
                  className="start-game-button"
                  onClick={() => {
                    setIsGameFinished(false);
                    setIsGameStarted(false);
                  }}
                >
                  Return Homepage
                </button>
                <button
                  className="start-game-button"
                  onClick={() => {
                    setInactiveCards([]);
                    setOpenedCards([]);
                    setIsGameFinished(false);
                    setIsGameStarted(true);
                    shuffleCards();
                  }}
                >
                  Restart Game
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GameBoard;
