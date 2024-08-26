import React, { useEffect, useState } from "react";
import Cup from "../assets/cup-icon.png";
import WinnieJpg from "../assets/winni.png";
import Ton from "../assets/ton.png";

const tournament = ({ data, myId, loading }) => {
  const toggleDisplay = (selector, displayStyle) => {
    document.querySelector(selector).style.display = displayStyle;
  };
  const closeTournament = () => toggleDisplay("#tournament", "none");

  if (loading === true) {
    var firstTenParticipants = data.slice(0, 100);
    var singleParticipant = data.find((p) => p.user_tg == myId);
    var indexes = data.findIndex((p) => p.user_tg == myId);
    if (firstTenParticipants[0]) {
      firstTenParticipants[0].bonus = 15;
    }
    if (firstTenParticipants[1]) {
      firstTenParticipants[1].bonus = 10;
    }
    if (firstTenParticipants[2]) {
      firstTenParticipants[2].bonus = 5;
    }
  }

  return (
    <>
      {loading === false ? (
        <>
          <div className="loading">
            <div className="tournament-info">
              <span className="tournament-title">Tournament</span>
              <button
                className="zen-close"
                id="content-close"
                onClick={closeTournament}
              >
                x
              </button>
              <div className="my-account"></div>
              <div className="tournament-prize-pool">
                <div className="prize-pool-description">
                  The total prize pool for the weekly tournament is 30 TON.
                </div>
                <hr className="tournament-hr" />
                <div className="tournament-rules">
                  <div className="loading">
                    <div className="loaders"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="tournament-info">
            <span className="tournament-title">Tournament</span>
            <button
              className="zen-close"
              id="content-close"
              onClick={closeTournament}
            >
              x
            </button>
            <div className="my-account">
              {singleParticipant && (
                <div
                  className="list-tournament"
                  key={singleParticipant.user_tg}
                >
                  <div className="li-info">
                    <div className="images">
                      <img src={Cup} className="daily-bonus-img" alt="" />
                    </div>
                    <div className="li-names">
                      <div>
                        <span>{singleParticipant.first_name}</span>
                      </div>
                      <div className="li-points">
                        <img src={WinnieJpg} className="weekly-bonus" alt="" />
                        <span>
                          {singleParticipant.balance_winnie
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                      </div>
                    </div>
                    {singleParticipant.bonus && (
                      <div className="list-bonus-weeks">
                        <img src={Ton} className="weekly-bonus" alt="" />
                        <span>&nbsp;</span>
                        <span>
                          {singleParticipant.bonus
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="tops">
                    <span>{indexes + 1}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="tournament-prize-pool">
            <div className="prize-pool-description">
              The total prize pool for the weekly tournament is <img src={Ton} className="weekly-bonus" alt="" />  30 TON.
            </div>
          </div>
          <hr className="tournament-hr" />
          <div className="tournament-rules">
            {firstTenParticipants.map((data, index) => (
              <div className="list-tournament" key={data.index + 1}>
                <div className="li-info">
                  <div className="images">
                    <img src={Cup} className="daily-bonus-img" alt="" />
                  </div>
                  <div className="li-names">
                    <div>
                      <span>{data.first_name}</span>
                    </div>
                    <div className="li-points">
                      <img src={WinnieJpg} className="weekly-bonus" alt="" />
                      <span>
                        {data.balance_winnie
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      </span>
                    </div>
                  </div>
                  {data.bonus && (
                    <div className="list-bonus-weeks">
                      <img src={Ton} className="weekly-bonus" alt="" />
                      <span>&nbsp;</span>
                      <span>
                        {data.bonus
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="tops">
                  <span>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default tournament;
