import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameBoard, Modal } from 'components';
import rule from '../../assets/img/rule.png';

// // Configs
// import { PATH_NAME } from 'configurations';

// // Services
// import authService from 'services/authService';

// Style
import './DashBoard.css';

import { setUser } from 'store/app/app.slice';
import { useCountDown } from 'hooks/useCountDown';
import { LEVEL, PATH_NAME } from 'configurations';
import {} from 'configurations';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.app.user);
  const level = LEVEL[user.result.level];
  const timeTotal = level.timeTotal;
  const cardTotal = level.cardTotal;
  const remainingTurn = user.result.remainingTurn;

  console.log('timeTotal', timeTotal);
  const {
    time,
    isTimerRunning,
    hasTimerEnded,
    startTimer,
    stopTimer,
    resetTime,
  } = useCountDown(timeTotal);

  const [result, setResult] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (hasTimerEnded) {
      dispatch(
        setUser({
          ...user,
          result: {
            ...user.result,
            remainingTurn: user.result.remainingTurn - 1,
          },
        })
      );
      setResult(2);
    }
  }, [hasTimerEnded]);

  const onFinishedHandler = () => {
    stopTimer();
    console.log('WIN!');
    setResult(1);
    dispatch(
      setUser({
        ...user,
        result: {
          ...user.result,
          level: user.result.level + 1,
        },
      })
    );
    const newTotalTime = LEVEL[user.result.level + 1].timeTotal;
    resetTime(newTotalTime);
  };

  useEffect(() => {
    //startGame();
    setShowModal(true);
  }, []);

  const startGame = () => {
    setResult(0);
    startTimer();
  };

  const onNextHandler = () => {
    startGame();
  };

  const onReplayHandler = () => {
    const newTotalTime = LEVEL[user.result.level].timeTotal;
    resetTime(newTotalTime);
    startGame();
  };

  const hideModal = () => {
    setShowModal(false);
    startGame();
  };

  console.log('isTimerRunning', isTimerRunning);
  const generateBoard = () => {
    if (result === 0) {
      return (
        <Fragment>
          <GameBoard
            cardTotal={cardTotal}
            isStarted={isTimerRunning}
            onFinished={onFinishedHandler}
            time={time}
            level={user.result.level}
            remainingTurn={remainingTurn}
          />
        </Fragment>
      );
    } else if (result === 1) {
      return (
        <div className='alert'>
          <div>
            Chúc mừng! <br /> bạn đã vượt qua vòng {user.result.level}!
          </div>
          <button className='myButton' onClick={onNextHandler}>
            Tiếp tục!
          </button>
        </div>
      );
    } else {
      return (
        <div className='alert'>
          {remainingTurn < 0 ? (
            <div>
              Chúc mừng bạn hoàn thành thử thách 6 ngày 6 đêm với game vui
              “Nhanh tay lẹ mắt” Trở lại làm việc hăng say cùng HD Saison
              nhé…GÉT GÔ!!!
            </div>
          ) : (
            <Fragment>
              <div>Bạn đã mất 1 lượt!</div>
              <div className='myButton' onClick={onReplayHandler}>
                Chơi lại!
              </div>
            </Fragment>
          )}
        </div>
      );
    }
  };

  return (
    <div className='dash-board'>
      <div className='dash-board-dim'>
        <Modal show={showModal} handleClose={hideModal}>
          <img src={rule} className='welcome' />
        </Modal>
        {generateBoard()}
      </div>
    </div>
  );
};

export default DashBoard;
