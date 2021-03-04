import React from 'react';
import countTime from '../../../utils/countTime';

const Timer = (props) => {
  const time = countTime(props.time)

  return (
    <div className="timer">{time}</div>
  )
}

export default Timer;
