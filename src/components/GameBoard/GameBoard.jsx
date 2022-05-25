import React, { useEffect, useState } from 'react';

import SingleCard from '../SingleCard/SingleCard';
import { CARDS } from 'configurations';

import './GameBoard.css';

const GameBoard = ({
  cardTotal,
  isStarted,
  onFinished,
  time,
  level,
  remainingTurn,
}) => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Start new game automatically
  useEffect(() => {
    if (isStarted) {
      shuffleCards();
    }
  }, [isStarted]);

  // shuffle card
  const shuffleCards = () => {
    let cardImages = [];
    for (let i = 0; i < cardTotal / 2; i++) {
      cardImages.push(CARDS[i]);
    }
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 400);
      }
    }
    let totalMatched = cards.reduce((accumulator, item) => {
      console.log('accumulator', accumulator);
      console.log('item', item);
      if (item.matched) {
        accumulator += 1;
      }
      return accumulator;
    }, 0);
    console.log('totalMatched', totalMatched);
    if (cards.length && totalMatched === cards.length) {
      onFinished();
    }
  }, [choiceOne, choiceTwo]);

  // reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <div className='Board'>
      {cards.length > 0 ? (
        <div className='text-container'>
          <div className='text top'>Số lượt còn lại: {remainingTurn}</div>
        </div>
      ) : (
        <div />
      )}
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {cards.length > 0 ? (
        <div className='text-container'>
          <div className='text'>Màn: {level + 1}</div>
          <div className='text'>Thời gian: {time}</div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default GameBoard;
