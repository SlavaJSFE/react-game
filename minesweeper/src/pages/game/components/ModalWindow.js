import React from 'react';

const ModalWindow = (props) => {
  const title = props.message.title;
  // const date = props.message.date[0];
  const time = props.message.time;

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* <span>Date: {date}</span> */}
            <span>Time: {time}</span>
          </div>
          <div className="modal-footer">
            <a href="/" className="btn btn-secondary">Back To Main Menu</a>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleButtonNewGame}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow;
