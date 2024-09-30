import React, { useEffect, useState } from "react";
import withIcon from "../../assets/loader5.gif";
import telegram from "../../assets/telegram.png";
import Tiktok from "../../assets/tok.webp";
import Youtube from "../../assets/youtube.png";
import Insta from "../../assets/insta.png";

const Special = ({ data, myId, fetchAccountData, loading }) => {
  const Complate = "https://withreferal-back-1.onrender.com/auth/complate";

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [amount, setAmount] = useState(0);
  const [clickedMe, setClickedMe] = useState(localStorage.getItem("task"));
  const [taskLink, setTaskLink] = useState(null);
  const [buttonState, setButtonState] = useState("Claim");

  useEffect(() => {
    if (loading) {
      setTasks(data.uncomplated);
      setCompletedTasks(data.complated);
    }
  }, [loading, data]);

  const ComplateTasks = async () => {
    try {
      const response = await fetch(Complate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_tg: myId.toString(),
          task_id: newPost,
          amount: amount,
        }),
      });

      if (response.ok) {
        console.log("Account data updated successfully");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  useEffect(() => {
    if (newPost !== null) {
      const timer = setTimeout(() => {
        localStorage.setItem("task", newPost);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newPost]);

  const handleStartClick = () => {
    const taskLinks = localStorage.getItem("link");
    setButtonState("Wait");
    setTimeout(() => {
      if (taskLinks) {
        window.open(taskLinks, '_blank');

      }
    }, 1000);
    setTimeout(() => {
      localStorage.removeItem("link");
      setButtonState("Claim");
    }, 3000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const checked = document.getElementById("checked");
      if (checked.innerText === "Claimed" || checked.innerText === "Wait") {
        checked.disabled = true;
      } else {
        checked.disabled = false;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [clickedMe]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClickedMe(localStorage.getItem("task"));
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const checkTask = () => {
    ComplateTasks();
    setButtonState("Wait");
    setTimeout(() => {
      fetchAccountData();
    }, 2000);
  };

  return (
    <>
      {loading === false ? (
        <>
          <img src={withIcon} className="loader-img" alt="" />
          <div className="loader"></div>
        </>
      ) : (
        <div className="task-list">
          {tasks.map((task) => {
            const isPathMatching = window.location.pathname === task.link;
            return (
              <div
                className={`task-list-item ${isPathMatching ? "highlight" : ""}`}
                id="task"
                key={task.id}
              >
                <div className="task-list-image">
                  {task.image  == 'telegram' ? <img src={telegram} className="task-list-image-icon" alt=""/>  : task.image == 'youtube' ? <img src={Youtube} className="task-list-image-icon" alt=""/> : task.image == 'tiktok' ? <img src={Tiktok} className="task-list-image-icon" alt=""/> : task.image == 'instagram' ? <img src={Insta} className="task-list-image-icon" /> : null}
                </div>
                <div className="task-info">
                  <div className="task-list-name">
                    <div className="task-list-name-title">{task.title}</div>
                    <div className="task-list-name-subtitle">
                      {task.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, "  ") || 0}{" "}
                      Winnie
                    </div>
                  </div>
                  <div className="task-list-status">
                    {clickedMe == task.id ? (
                      <button
                        className="task-list-status-button"
                        id="checked"
                        onClick={checkTask}
                      >
                        {buttonState || "Wait"}
                      </button>
                    ) : (
                      <>
                        <button
                          className="task-list-status-button active-btn"
                          id="start"
                          onClick={() => {
                            localStorage.setItem("link", task.link);
                            localStorage.setItem("task", task.id);
                            setNewPost(task.id);
                            localStorage.setItem("amount", task.amount);
                            setAmount(task.amount);
                            handleStartClick();
                          }}
                        >
                          START
                        </button>
                        <button
                          className="task-list-status-button completed"
                          id="claimed"
                          hidden
                        >
                          Wait
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {completedTasks && (
            <>
              <hr className="task-hr" />
              {completedTasks.map((task) => (
                <div className="task-list-item" key={task.id}>
                  <div className="task-list-image">
                    {task.image  == 'telegram' ? <img src={telegram} className="task-list-image-icon" alt=""/>  : task.image == 'youtube' ? <img src={Youtube} className="task-list-image-icon" alt=""/> : task.image == 'tiktok' ? <img src={Tiktok} className="task-list-image-icon" alt=""/> : task.image == 'instagram' ? <img src={Insta} className="task-list-image-icon" /> : null}
                  </div>
                  <div className="task-info">
                    <div className="task-list-name">
                      <div className="task-list-name-title title-complated">
                        {task.title}
                      </div>
                      <div className="task-list-name-subtitle title-complated">
                        {task.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, "  ") || 0}{" "}
                        Winnie
                      </div>
                    </div>
                    <div className="task-list-status">
                      <button className="task-list-status-button completed">
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Special;
