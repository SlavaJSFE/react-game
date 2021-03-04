import React from 'react';

const Volume = (props) => {
  return (
    <div className='volume'>
      <label>
        Volume:
        <span className='slider-container'>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={props.volume}
            onChange={(event) => {
              props.setVolume(parseFloat(event.target.value))
            }}
          />
        </span>
        {props.volume.toFixed(2)}
      </label>
    </div>
  )
}

export default Volume;
