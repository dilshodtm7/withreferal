import React from "react";
import "./invite.css";
import { FaCopy } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Tonup from "../../assets/winni.png";
import Ton from "../../assets/ton.png";
import withIcon from "../../assets/loader5.gif";


const invite = ({referer,loading,data}) => {


  const referal = "https://t.me/winniecoin_bot/play?startapp="
  
  const copyText = () => {
    var copyText = referal + data.user_tg;
    navigator.clipboard.writeText(copyText).then(() => {
        console.log("Text copied to clipboard:", copyText);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
};

  return (
    <>
      {
        loading === false ? (
         <> <img src={withIcon} className="loader-img" alt="" />
          <div class="loader"></div>
          </>
        ) : (
          <>
          <div className="invite-container">
        <div className="invite">
          <div className="invite-text">
            <div className="invite-text-title">Invite Friends!</div>
            <div className="invite-text-subtitle">
              <span className="invite-text-span">
                You and your friends will receive bonuses
              </span>
            </div>
          </div>
          <div className="invite-link">
            <div className="invite-link-title">Referal link</div>
            <div class="copy-container">
              <input
                disabled
                type="text"
                className="invite-link-input"
                value={referal + data.user_tg}
                readOnly
              />
              <button onClick={copyText} className="copy-btn">
                <FaCopy />
              </button>
            </div>
            <div className="invite-buttons">
              <button className="invite-btn" onClick={copyText}>
                Invite Friend
              </button>
            </div>
          </div>
        </div>
        <hr className="invite-hr" />
      </div>
      <div className="bonus-ref">
        <span className="claims-title">Your Referral Bonuses</span>
      </div>
      <div className="claims">
        <div className="referal-claims">
          <div className="referal-balance">
            <img src={Tonup} alt="" className="referal-balance-img" />
            <div className="referal-balance-text">{
              referer === null ? "0" : referer.length * 500
              }</div>
          </div>
          <hr className="claim-hr" />
          <div className="referal-balance">
            <img src={Ton} alt="" className="referal-balance-img" />
            <div className="referal-balance-text">{
              referer === null ? "0" : referer.length * 0.001}</div>
          </div>
        </div>
      </div>
      <div className="friends-list">
        <div className="friends-list-title">Friends</div>
        <div className="friends-list-container">

             
             {referer?.map((referer, index) => {
                return (
                  <div className="friends-list-item">
            <div className="image">
              <FaUserGraduate className="referal-icon" />
              <div className="name">{referer.first_name ? referer.first_name : "Kimdur"}</div>
            </div>
            <div className="DIV">
              <div className="referal-balance">
                
                
              </div>
            </div>
          </div>)
              })
             }
        </div>
      </div>
      </>
        )
      }
    </>
  );
};

export default invite;
