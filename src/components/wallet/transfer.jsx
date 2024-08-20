import React from "react";

const transfer = () => {
  return (
    <>
      <div className="deposit">
        <div className="swap-title">
          <span>Transfer</span>
        </div>
        <div className="mt10">
          <div className="swap-title">
            <span>Transfer Your Winnie Coin CW</span>
          </div>
          <div className="div-infosend">
            <label htmlFor="">Adress</label>
            <input
              type="text"
              className="send-input"
              placeholder="Address CW"
            />
          </div>
          <div className="div-infosend">
            <label htmlFor=""> Amount</label>
            <input type="number" className="send-input" placeholder="0.00" />
          </div>
          <div className="div-infosend">
            <button className="send-btn">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default transfer;
