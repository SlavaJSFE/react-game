import React from 'react';

const Timer = (props) => {
  const minutes = Math.floor(props.time / 60);
  const seconds = props.time - minutes * 60 || 0;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const time = `${minutes}:${formattedSeconds}`;

  return (
    <div className="timer">{time}</div>
  )
}

export default Timer;
