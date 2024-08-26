import React, { useEffect, useState, useRef } from "react";
import "./settings.css";
import { Wheel } from "react-custom-roulette";
import withIcon from "../../assets/loader5.gif";

const Settings = ({ data, loading, myId, fetchAccountData }) => {
  const [result, setResult] = useState(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [inputs, setInputs] = useState(Array(7).fill(""));
  const [status, setStatus] = useState(Array(7).fill("default"));
  const [message, setMessage] = useState("");

  const newspin = "https://withreferal-back.onrender.com/auth/newspin";
  const newquestion = "https://withreferal-back.onrender.com/auth/question";

  const bonus = [
    { option: "200", style: { backgroundColor: "#1E2C3A", textColor: "white" } },
    { option: "350", style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" } },
    { option: "500", style: { backgroundColor: "#1E2C3A", textColor: "white" } },
    { option: "700", style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" } },
    { option: "1000", style: { backgroundColor: "#1E2C3A", textColor: "white" } },
    { option: "1500", style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" } },
    { option: "2000", style: { backgroundColor: "#1E2C3A", textColor: "white" } },
    { option: "3000", style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" } },
  ];

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 8);
  const newPostDate = currentDate.toISOString();

  const nextDayMidnight = new Date();
  nextDayMidnight.setUTCDate(nextDayMidnight.getUTCDate() + 1);
  nextDayMidnight.setHours(0, 0, 0, 0);
  const newPostsDate = nextDayMidnight.toISOString();

  const updateSpin = async () => {
    await fetch(newspin, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_tg: myId.toString(),
        balance_winnie: Number(data.balance_winnie) + Number(result),
        spin_date: newPostDate,
      }),
    });
  };

  const updateQuestion = async () => {
    await fetch(newquestion, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_tg: myId.toString(),
        question: newPostsDate,
      }),
    });
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const spinBtn = document.getElementById("spin-btn");
      spinBtn.disabled = true;
      spinBtn.innerText = "Wait";
      const newPrizeNumber = Math.floor(Math.random() * bonus.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setResult(bonus[newPrizeNumber].option);
    } else {
      document.getElementById("overs-roulete").style.display = "flex";
    }
  };

  const handleUIUpdate = (btnId, dataDate, newText, callback) => {
    const btn = document.getElementById(btnId);
    const currentDate = new Date();
    const storedDate = new Date(dataDate);

    const diffMs = storedDate - currentDate;
    if (diffMs > 0) {
      btn.innerText = `${Math.floor(diffMs / (1000 * 60 * 60))}h : ${Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))}m : ${Math.floor((diffMs % (1000 * 60)) / 1000)}s`;
      btn.disabled = true;
    } else {
      callback();
      btn.innerText = newText;
      btn.disabled = false;
    }
  };

  useEffect(() => {
    if (loading) {
      const spinBtnUpdate = () => handleUIUpdate("spin-btn", data.spin_date, "Free Spin", () => {});
      const questionBtnUpdate = () => handleUIUpdate("question-btn", data.question, "Enter Question", () => {
        document.querySelectorAll(".crossword-input").forEach(input => input.readOnly = false);
      });

      const intervalId = setInterval(() => {
        spinBtnUpdate();
        questionBtnUpdate();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [data, loading]);

  const handleInputChange = (event, index) => {
    const value = event.target.value.toUpperCase();
    const newInputs = [...inputs];
    const newStatus = [...status];
    newInputs[index] = value;

    if (value === "") {
      newStatus[index] = "default";
    } else {
      newStatus[index] = "written";
      if (index < 6) {
        inputRefs.current[index + 1].focus();
      }
    }

    setInputs(newInputs);
    setStatus(newStatus);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const checkAnswer = () => {
    if (inputs.includes("")) {
      setMessage("Please fill all fields.");
      return;
    }

    const newStatus = inputs.map((input, index) => (input === "DILSHOD"[index] ? "correct" : "incorrect"));
    setStatus(newStatus);

    if (newStatus.every((status) => status === "correct")) {
      setMessage("All letters are correct!");
      document.getElementById("question").style.display = "flex";
    } else {
      setMessage("Some letters are incorrect.");
    }
  };

  const posted = () => {
    document.getElementById("spin-btn").disabled = true;
    document.getElementById("overs-roulete").style.display = "none";
    updateSpin();
    setTimeout(fetchAccountData, 2000);
  };

  const posteQuestion = () => {
    document.getElementById("question-btn").disabled = true;
    document.getElementById("question").style.display = "none";
    updateQuestion();
    setTimeout(fetchAccountData, 2000);
  };

  const inputRefs = useRef([]);

  return (
    <>
      {!loading ? (
        <>
          <img src={withIcon} className="loader-img" alt="Loading..." />
          <div className="loader"></div>
        </>
      ) : (
        <>
          <div className="overs-roulete" id="overs-roulete" style={{ display: "none" }}>
            <div className="claim-roulete">
              <span className="claim-got">You got</span>
              <span className="claim-span">
                {result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Winnie Coin
              </span>
              <button className="claim-btn" onClick={posted}>Claim Bonus</button>
            </div>
          </div>

          <div className="overs-roulete" id="question" style={{ display: "none" }}>
            <div className="claim-roulete">
              <span className="claim-got">You got</span>
              <span className="claim-span">4500 Winnie Coin</span>
              <button className="claim-btn" onClick={posteQuestion}>Claim Bonus</button>
            </div>
          </div>

          <div className="daily-question">
            <div className="question">Daily Question</div>
            <div className="question">
              <button className="question-btn" id="question-youtube">⫸ Watch Video</button>
            </div>
            <div className="crossword" id="crossword-words">
              {inputs.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  className={`crossword-words crossword-input ${status[index]}`}
                  value={input}
                  onChange={(event) => handleInputChange(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1}
                  readOnly
                />
              ))}
            </div>
            <button className="crossword-btn-enter" id="question-btn" onClick={checkAnswer} disabled>Loading</button>
            {message && <div className="message">{message}</div>}
          </div>

          <hr className="line" />
          <div className="setting-container">
            <div className="account-info">
              <div className="name">
                <span className="name-span">
                  Spin to win guaranteed prizes. You have a free spin every 8 hours.
                </span>
              </div>
            </div>
            <div className="roulete-container">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={bonus}
                onStopSpinning={() => {
                  setMustSpin(false);
                  document.getElementById("overs-roulete").style.display = "flex";
                }}
              />
            </div>
            <button className="spin-btn" id="spin-btn" onClick={handleSpinClick} disabled>Loading</button>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
