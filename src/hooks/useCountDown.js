import { useEffect, useState } from 'react';

const useCountDown = (startTime) => {
  console.log('reload startTimer1: ', startTime);
  const [time, setTime] = useState(startTime);
  console.log('reload startTimer2: ', time);
  const [intervalID, setIntervalID] = useState(null);
  const hasTimerEnded = time <= 0;
  const isTimerRunning = intervalID != null;

  const update = () => {
    setTime((time) => time - 1);
  };

  const startTimer = () => {
    setIntervalID(setInterval(update, 1000));
  };

  const resetTime = (startTime) => {
    console.log('resetTime', startTime);
    setTime(startTime);
  };

  const stopTimer = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  };

  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  }, [hasTimerEnded]);

  // clear interval when component unmounts
  useEffect(
    () => () => {
      clearInterval(intervalID);
    },
    []
  );

  return {
    time,
    isTimerRunning,
    hasTimerEnded,
    startTimer,
    stopTimer,
    resetTime,
  };
};

export { useCountDown };
