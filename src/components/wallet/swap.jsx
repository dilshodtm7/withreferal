import React, { useState, useEffect, useRef } from "react";
import Coin from "../../assets/winni.png";
import Ton from "../../assets/ton.png";
import { PiArrowsDownUpBold } from "react-icons/pi";

const Swap = ({ data, fetchAccountData, myId, toggleVisibility }) => {
  const [sendOption, setSendOption] = useState({ label: "CW", img: Coin });
  const [receiveOption, setReceiveOption] = useState({ label: "TON", img: Ton });
  const [isSendDropdownOpen, setIsSendDropdownOpen] = useState(false);
  const [isReceiveDropdownOpen, setIsReceiveDropdownOpen] = useState(false);
  const [sendInputValue, setSendInputValue] = useState("");
  const [receiveInputValue, setReceiveInputValue] = useState("");

  const sendInputRef = useRef(null);
  const receiveInputRef = useRef(null);
  const SwapURL = "https://withreferal-back-1.onrender.com/auth/swap";

  const toggleSendDropdown = () => {
    setIsSendDropdownOpen(!isSendDropdownOpen);
    setIsReceiveDropdownOpen(false);
  };

  const toggleReceiveDropdown = () => {
    setIsReceiveDropdownOpen(!isReceiveDropdownOpen);
    setIsSendDropdownOpen(false);
  };

  const handleSendChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setSendInputValue(value);
      setReceiveInputValue(((value * 0.0002) / 6.89).toFixed(4));
    }
  };

  const handleReceiveChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setReceiveInputValue(value);
      setSendInputValue(((value * 6.89) / 0.0002).toFixed(4));
    }
  };

  const handleInputClick = (ref) => {
    if (ref.current) {
      const length = ref.current.value.length;
      ref.current.setSelectionRange(length, length);
    }
  };

  const handleKeyDown = (e) => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const maxBet = () => {
    setSendInputValue(data.balance_winnie);
    setReceiveInputValue(((data.balance_winnie * 0.0002) / 6.89).toFixed(4));
  };

  const swapToken = async () => {
    try {
      const response = await fetch(SwapURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_tg: myId.toString(),
          balance_winnie: data.balance_winnie - Number(sendInputValue),
          balance_ton: Number(data.balance_ton) + Number(receiveInputValue),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      console.log("Account data updated successfully");
    } catch (error) {
      console.error("Error fetching account data:", error);
      document.getElementById("alert").textContent = "Error processing swap.";
      setTimeout(() => {
        document.getElementById("alert").textContent = "";
      }, 3000);
    }
  };

  const submits = (e) => {
    e.preventDefault();
    if (data.balance_winnie - Number(sendInputValue) < 0) {
      document.getElementById("alert").textContent = "Insufficient balance";
      setTimeout(() => {
        document.getElementById("alert").textContent = "";
      }, 3000);
    } else if (Number(sendInputValue) < 100) {
      document.getElementById("alert").textContent = "Minimum swap is 100 CW";
      setTimeout(() => {
        document.getElementById("alert").textContent = "";
      }, 3000);
    } else {
      document.getElementById("alert").textContent = "Waiting for confirmation...";
      setTimeout(() => {
        document.getElementById("swaps").style.display = "none";
        document.getElementById("confirmed").style.display = "";
      }, 1500);
    }
  };

  useEffect(() => {
    const sliderLabel = document.getElementById('sliderLabel');
    const confirmSlider = document.getElementById('confirm');
    const min = +confirmSlider.min;
    const max = +confirmSlider.max;

    const setPos = (field) => {
      const position = (+field.value - min) / (max - min) * 100;
      field.style.background = `linear-gradient(to right, #008aff 0%, #008aff ${position}%, #fff ${position}%, white 100%)`;
    };

    const handleInput = () => {
      setPos(confirmSlider);
      if (confirmSlider.value === confirmSlider.max) {
        console.log(sendInputValue);
        sliderLabel.textContent = 'Successfully';
        swapToken();
        setTimeout(() => {
          sliderLabel.textContent = 'Wait';
        }, 1500);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    };

    confirmSlider.addEventListener('input', handleInput);
    setPos(confirmSlider);

    return () => {
      confirmSlider.removeEventListener('input', handleInput);
    };
  }, [sendInputValue, receiveInputValue]);

  return (
    <div className="swap">
      <div className="swap-confirmation" id="confirmed" style={{ display: 'none' }}>
        <div className="swap-title">
          <span>Swap Confirmation</span>
        </div>
        <div className="send mt10">
          <div className="send-title">
            <div>
              <span className="send-title-span">Send</span>
            </div>
            <div>
              <span className="send-title-span">Receive</span>
            </div>
          </div>

          <div className="custom-select">
            <div className="select-selecteds" onClick={toggleSendDropdown}>
              <img src={sendOption.img} alt={sendOption.label} />
              {sendInputValue} {sendOption.label}
            </div>
            <div className="change">≻</div>
            <div className="select-selecteds" onClick={toggleReceiveDropdown}>
              <img src={receiveOption.img} alt={receiveOption.label} />
              {receiveInputValue} {receiveOption.label}
            </div>
          </div>

          <div id="sliderContainer">
            <input
              id="confirm"
              type="range"
              defaultValue="0"
              min="0"
              max="100"
            />
            <span id="sliderLabel">Confirm Swap</span>
          </div>
        </div>
      </div>

      <div id="swaps">
        <div className="swap-title">
          <span>Swap</span>
        </div>
        <div className="mt10">
          <div className="send">
            <div className="send-title">
              <div>
                <span className="send-title-span">Send</span>
              </div>
              <div>
                <span className="send-title-span">
                  Balance: {data.balance_winnie}
                </span>
                <span className="maxbtn" onClick={maxBet}>
                  MAX
                </span>
              </div>
            </div>

            <div className="custom-select">
              <div className="select-selected" onClick={toggleSendDropdown}>
                <img src={sendOption.img} alt={sendOption.label} />
                {sendOption.label} ≻
              </div>

              <input
                type="number"
                className="send-amount"
                value={sendInputValue}
                onChange={handleSendChange}
                onKeyDown={handleKeyDown}
                onClick={() => handleInputClick(sendInputRef)}
                ref={sendInputRef}
                placeholder="Min 20000"
                min="20000"
              />
            </div>
          </div>

          <div className="send">
            <div className="send-title">
              <span className="send-title-span">Receive</span>
            </div>

            <div className="custom-select">
              <div className="select-selected" onClick={toggleReceiveDropdown}>
                <img src={receiveOption.img} alt={receiveOption.label} />
                {receiveOption.label} ≻
              </div>

              <input
                type="number"
                className="send-amount"
                value={receiveInputValue}
                onChange={handleReceiveChange}
                onKeyDown={handleKeyDown}
                onClick={() => handleInputClick(receiveInputRef)}
                ref={receiveInputRef}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <button className="swap-btn" 
          disabled
          onClick={submits}
          >
          Coming Soon
        </button>
        <div className="alert">
          <span id="alert"></span>
        </div>
      </div>
    </div>
  );
};

export default Swap;
