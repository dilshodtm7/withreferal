import React from "react";
import { FaRegCopy } from "react-icons/fa6";
import { CiSaveUp2 } from "react-icons/ci";

const deposit = () => {
  const CopyAddres = () => {
    navigator.clipboard.writeText("0x12345678901234567890123455465");
    alert("Address copied to clipboard!");
  };

  return (
    <>
      <div className="deposit">
        <div className="swap-title">
          <span>Deposit</span>
        </div>

        <div className="mt10">
          <div className="swap-title">
            <span>Get Winnie Coin CW</span>
          </div>

          <div className="div-infosend">
            <span>Send only a Winnie coin CW coin to this address</span>
          </div>
        </div>
        <hr className="deposit-hr" />
        <div className="mt10">
          <div className="swap-title">
            <span> Your Address</span>
          </div>
        </div>
        <div className="mt10">
          <div className="wallet-address">
            <span>0x12345678901234567890123455465</span>
          </div>
        </div>
        <div className=" deposit-btn">
          <button className="copy-adress-btn" onClick={CopyAddres}>
            <FaRegCopy /> Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default deposit;
