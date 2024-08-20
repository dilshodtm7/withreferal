import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import Coin from "../../assets/winni.png";
import Ton from "../../assets/ton.png";
import withIcon from "../../assets/loader5.gif";
import { MdOutlineTaskAlt, MdCallMade, MdCallReceived } from "react-icons/md";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { TbSquareRounded, TbArrowsExchange } from "react-icons/tb";
import { CiExport, CiImport } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import Swap from "./swap.jsx";
import Deposit from "./deposit.jsx";
import Transfer from "./transfer.jsx";

import "./style.css";

const Home = ({ data, loading , fetchAccountData, myId }) => {
  const toggleVisibility = (id, display) => {
    document.getElementById(id).style.display = display;
  };
  const tonPrice = 7.89







    



  if (loading === false) {
    return (
      <div className="body-balance">
        <img src={withIcon} className="loader-img" alt="Loading" />
        <div className="loader"></div>
      </div>
    );
  }

  

  
  

  return (
    <div className="body-balance">
      <div className="balance-text-title">Wallet</div>

      {/* Swap Modal */}
      <div className="daily-bonuses" id="swap" style={{ display: "none" }}>
        <div className="daily-bonus-container">
          <button
            className="zen-close"
            onClick={() => toggleVisibility("swap", "none")}
          >
            x
          </button>
          <Swap data={data} myId={myId} toggleVisibility={toggleVisibility} fetchAccountData={fetchAccountData} />
        </div>
      </div>

      {/* Deposit Modal */}
      <div className="daily-bonuses" id="deposit" style={{ display: "none" }}>
        <div className="daily-bonus-container">
          <button
            className="zen-close"
            onClick={() => toggleVisibility("deposit", "none")}
          >
            x
          </button>
          <Deposit />
        </div>
      </div>

      {/* Withdrawal Modal */}
      <div className="daily-bonuses" id="withdrawal" style={{ display: "none" }}>
        <div className="daily-bonus-container">
          <button
            className="zen-close"
            onClick={() => toggleVisibility("withdrawal", "none")}
          >
            x
          </button>
          <div className="wallet-title">Withdraw soon</div>
          <div className="wallet-connects">
            <TonConnectButton />
          </div>
          <div className="ton-airdop">
                  <div className="">
                    <MdOutlineTaskAlt className="airdrop" />
                    <span>Airdrop will be available soon</span>
                  </div>
                  <div className="">
                    <MdOutlineTaskAlt className="airdrop" />
                    <span>Airdrop will be available soon</span>
                  </div>
                  <div className="">
                    <HiOutlineArrowPathRoundedSquare className="airdrops" />
                    <span>Airdrop will be available soon</span>
                  </div>
                  <div className="">
                    <TbSquareRounded className="airdrops" />
                    <span>Airdrop will be available soon</span>
                  </div>
          </div>
        </div>
      </div>

      {/* Transfer List Modal */}
      <div className="daily-bonuses" id="transferlist" style={{ display: "none" }}>
        <div className="daily-bonus-container">
          <div className="exchange">
            <span>Transfer CW</span>
          </div>
          <div className="exchange">
            <span>Coming Soon</span>
          </div>
          <button
            className="zen-close"
            onClick={() => toggleVisibility("transferlist", "none")}
          >
            x
          </button>
          <div className="exchange">
            <div className="exchange-btns" onClick={() => toggleVisibility("transferlist", "none") || toggleVisibility("transfer", "block")}>
              <MdCallReceived className="icon-btn" />
              <span className="exchange-text">Receive</span>
            </div>
            <div className="exchange-btns" onClick={() => toggleVisibility("transferlist", "none") || toggleVisibility("transfersend", "block")}>
              <MdCallMade className="icon-btn" />
              <span className="exchange-text">Send</span>
            </div>
            <div className="exchange-btns">
              <FaHistory className="icon-btn" />
              <span className="exchange-text">History</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Receive Modal */}
      <div className="daily-bonuses" id="transfer" style={{ display: "none" }}>
        <div className="daily-bonus-container">
          <button
            className="zen-close"
            onClick={() => toggleVisibility("transfer", "none")}
          >
            x
          </button>
          <Deposit />
        </div>
      </div>

      {/* Transfer Send Modal */}
      <div className="daily-bonuses" id="transfersend" style={{ display: "none" }}>
        <div className="daily-bonus-container">
          <button
            className="zen-close"
            onClick={() => toggleVisibility("transfersend", "none")}
          >
            x
          </button>
          <Transfer />
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="wallet-all-balance">
        <div className="wallet-all-balance-text">
          <span className="balance-wallets">Total balance</span>
          <div className="wallet-balance">
            <span className="balanc">
              {(data.balance_winnie * 0.0002 + Number(data.balance_ton)  * tonPrice).toFixed(2)}
            </span>
            <span className="tousdt">USDT</span>
          </div>
          <div>
            <span className="balance-winn"> ≈ </span>
            <span className="balance-win">
              {(
                (data.balance_winnie * 0.0002 + Number(data.balance_ton) * tonPrice) /
                tonPrice
              ).toFixed(3)}{" "}
              TON
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="exchange">
        <div className="exchange-btn" onClick={() => toggleVisibility("withdrawal", "block")}>
          <CiExport className="icon-btn" />
          <span className="exchange-text">Withdrawal</span>
        </div>
        <div className="exchange-btn" onClick={() => toggleVisibility("transferlist", "block")}>
          <TbArrowsExchange className="icon-btn" />
          <span className="exchange-text">Transfer</span>
        </div>
        <div className="exchange-btn" onClick={() => toggleVisibility("swap", "block")}>
          <HiOutlineArrowPathRoundedSquare className="icon-btn" />
          <span className="exchange-text">Swap</span>
        </div>
      </div>

      {/* Wallet Balances */}
      <div className="balance-wallet">
        <div className="wallets-balances">
          <div className="usdt">
            <span className="balance-wallet-span">Winnie Coin</span>
            <span className="balance-wallet-span">
              <img src={Coin} className="coin" alt="Winnie Coin" />
              {data.balance_winnie.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              cw
            </span>
          </div>
          <div className="usdt">
            <span className="balance-wallet-span">TON</span>
            <span className="balance-wallet-span">
              <img src={Ton} className="coin" alt="TON" />
              {Number(data.balance_ton).toFixed(3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
