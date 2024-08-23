import React, { useEffect, useState, useRef } from "react";
import "./settings.css";
import { Wheel } from "react-custom-roulette";
import withIcon from "../../assets/loader5.gif";

const Settings = ({ data, loading, myId, fetchAccountData }) => {
  const [result, setResult] = useState(null);
  const newspin = "https://withreferal-back.onrender.com/auth/newspin";
  const newquestion = "https://withreferal-back.onrender.com/auth/question";

  const bonus = [
    {
      option: "500",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "1000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
    {
      option: "2000",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "3000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
    {
      option: "4000",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "5000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
    {
      option: "6000",
      style: { backgroundColor: "#1E2C3A", textColor: "white" },
    },
    {
      option: "7000",
      style: { backgroundColor: "rgb(211, 182, 17)", textColor: "black" },
    },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 8);
  const newPostDate = currentDate.toISOString();

  const currentDates = new Date();
  currentDates.setUTCDate(currentDates.getUTCDate() + 1);
  currentDates.setHours(0, 0, 0, 0);
  const newPostsDate = currentDates.toISOString();

  const updateSpin = async () => {
    await fetch(newspin, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        balance_winnie: Number(data.balance_winnie) + Number(result),
        spin_date: newPostDate,
      }),
    });
  };

  const updatequestion = async () => {
    await fetch(newquestion, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_tg: myId.toString(),
        question: newPostsDate,
      }),
    });
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      document.getElementById("spin-btn").disabled = true;
      document.getElementById("spin-btn").innerText = "Wait";
      const newPrizeNumber = Math.floor(Math.random() * bonus.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setResult(bonus[newPrizeNumber].option);
    } else {
      document.getElementById("overs-roulete").style.display = "flex";
    }
  };

  useEffect(() => {
    if (loading) {
      let for2 = false;
      let myname = false;
      const updateUI = () => {
        const currentDate = new Date();
        const storedDate = new Date(data.spin_date);
        const spinBtn = document.getElementById("spin-btn");
        if (data.spin_date) {
          const diffMs = storedDate - currentDate;
          if (diffMs > 0) {
            spinBtn.innerText = `${Math.floor(
              diffMs / (1000 * 60 * 60)
            )}h : ${Math.floor(
              (diffMs % (1000 * 60 * 60)) / (1000 * 60)
            )}m : ${Math.floor((diffMs % (1000 * 60)) / 1000)}s`;
            spinBtn.disabled = true;
          } else {
            if (!myname) {
              myname = true;
              spinBtn.innerText = "Free Spin";
              spinBtn.disabled = false;
              console.log("1");
            }
          }
        } else {
          if (for2 === false) {
            for2 = true;
            spinBtn.innerText = "Free Spin";
            spinBtn.disabled = false;
          }
        }
      };

      const intervalId = setInterval(updateUI, 1000);
      const timeoutId = setTimeout(updateUI, 100);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      let forquestion = false;
      let myquestion = false;
      const updateUI = () => {
        const currentDate = new Date();
        const storedDate = new Date(data.question);
        const questionBtn = document.getElementById("question-btn");
        const crosswords = document.querySelectorAll(".crossword-input");
        const Youtube = document.getElementById("question-youtube");
        if (data.question) {
          const diffMs = storedDate - currentDate;
          if (diffMs > 0) {
            questionBtn.innerText = `${Math.floor(
              diffMs / (1000 * 60 * 60)
            )}h : ${Math.floor(
              (diffMs % (1000 * 60 * 60)) / (1000 * 60)
            )}m : ${Math.floor((diffMs % (1000 * 60)) / 1000)}s`;
            crosswords.forEach(crossword => {
              crossword.readOnly = true;
          });

            questionBtn.disabled = true;
          } else {
            if (!myquestion) {
              crosswords.forEach(crossword => {
                crossword.readOnly = false;
            });

              myquestion = true;
              questionBtn.innerText = "Enter Question";
              questionBtn.disabled = false;
            }
          }
        } else {
          if (forquestion === false) {
            forquestion = true;
            crosswords.forEach(crossword => {
              crossword.readOnly = false;
          });

            questionBtn.innerText = "Enter Question";
            questionBtn.disabled = false;
          }
        }
      };

      const intervalId = setInterval(updateUI, 1000);
      const timeoutId = setTimeout(updateUI, 100);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [data]);

  const posted = () => {
    document.getElementById("spin-btn").disabled = true;
    document.getElementById("overs-roulete").style.display = "none";
    updateSpin();

    setTimeout(() => {
      fetchAccountData();
    }, 2000);
  };

  const posteQuestion = () => {
    document.getElementById("question-btn").disabled = true;
    document.getElementById("question").style.display = "none";
    updatequestion();

    setTimeout(() => {
      fetchAccountData();
    }, 2000);
  };

  const correctAnswer = "DILSHOD";
  const [inputs, setInputs] = useState(Array(correctAnswer.length).fill(""));
  const [status, setStatus] = useState(
    Array(correctAnswer.length).fill("default")
  );
  const [message, setMessage] = useState("");

  const inputRefs = useRef([]);

  const handleInputChange = (event, index) => {
    const value = event.target.value.toUpperCase();
    const newInputs = [...inputs];
    const newStatus = [...status];

    newInputs[index] = value;
    setInputs(newInputs);

    if (value === "") {
      newStatus[index] = "default"; // Set to white on backspace
    } else {
      newStatus[index] = "written"; // Set to yellow after typing
      if (index < correctAnswer.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    setStatus(newStatus);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault(); // Prevent default backspace behavior
      if (inputs[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (inputs[index] !== "") {
        const newInputs = [...inputs];
        const newStatus = [...status];
        newInputs[index] = "";
        newStatus[index] = "default"; // Set to white on backspace
        setInputs(newInputs);
        setStatus(newStatus);
      }
    }
  };

  const checkAnswer = () => {
    if (inputs.includes("")) {
      setMessage("Please fill all fields.");
      return;
    }

    const newStatus = inputs.map((input, index) =>
      input === correctAnswer[index] ? "correct" : "incorrect"
    );

    setStatus(newStatus);

    if (newStatus.every((status) => status === "correct")) {
      setMessage("All letters are correct!");
      document.getElementById("question").style.display = "flex";
    } else {
      setMessage("Some letters are incorrect.");
    }
  };

  return (
    <>
      <div className="w80">
        <span>Bonus</span>
      </div>
      {loading === false ? (
          <>
            <img src={withIcon} className="loader-img" alt="" />
            <div className="loader"></div>
          </>
        ) : (<>
      <div
        className="overs-roulete"
        id="overs-roulete"
        style={{ display: "none" }}
      >
        <div className="claim-roulete">
          <span className="claim-got">You got</span>
          <span className="claim-span">
            {result?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Winnie
            Coin
          </span>
          <button className="claim-btn" onClick={posted}>
            Claim Bonus
          </button>
        </div>
      </div>

      <div className="overs-roulete" id="question" style={{ display: "none" }}>
        <div className="claim-roulete">
          <span className="claim-got">You got</span>
          <span className="claim-span">8000 Winnie Coin</span>
          <button className="claim-btn" onClick={posteQuestion}>
            Claim Bonus
          </button>
        </div>
      </div>

      <div className="daily-question">
        <div className="question">Daily Question</div>
        <div className="question">
          <button className="question-btn" id="question-youtube">
            {" "}
            ⫸ Watch Video
          </button>
        </div>
        <div className="crossword" id="crossword-words">
          {inputs.map((input, index) => (
            <input
              type="text"
              key={index}
              className={`crossword-words  crossword-input ${status[index]}`}
              value={input}
              onChange={(event) => handleInputChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
            />
          ))}
        </div>

        <button
          className="crossword-btn-enter"
          id="question-btn"
          onClick={checkAnswer}
        >
          Enter
        </button>

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
                  document.getElementById("overs-roulete").style.display =
                    "flex";
                }}
              />
            </div>

            <button
              className="spin-btn"
              id="spin-btn"
              onClick={handleSpinClick}
            >
              Free spin
            </button>
          
        
      </div>
      </>
    )}
    </>
  );
};

export default Settings;
