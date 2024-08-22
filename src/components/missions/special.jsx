import React, { useEffect, useState } from "react";
import { FaTelegram } from "react-icons/fa";
import withIcon from "../../assets/loader5.gif";

const Special = ({ data, myId, fetchAccountData, loading }) => {
  const COMPLATE_URL = "http://localhost:9090/auth/complate";

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [amount, setAmount] = useState(0);
  const [clickedTaskId, setClickedTaskId] = useState(localStorage.getItem("task"));
  const [buttonState, setButtonState] = useState("Claim");

  useEffect(() => {
    if (loading) {
      setTasks(data.uncomplated);
      setCompletedTasks(data.complated);
    }
  }, [loading, data]);

  const completeTasks = async () => {
    try {
      const response = await fetch(COMPLATE_URL, {
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
      console.error("Error completing task:", error);
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
    setButtonState("Wait");
    setTimeout(() => {
      // Simulate opening a URL
      // window.location.href = "https://t.me/aviabot_store";
    }, 1000);
    setTimeout(() => {
      setButtonState("Claim");
    }, 3000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClickedTaskId(localStorage.getItem("task"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const checkTask = () => {
    completeTasks();
    setButtonState("Wait");
    setTimeout(() => {
      fetchAccountData();
    }, 2000);
  };

  return (
    <>
      {loading === false ? (
        <>
          <img src={withIcon} className="loader-img" alt="Loading..." />
          <div className="loader"></div>
        </>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-list-item" id="task" key={task.id}>
              <div className="task-list-image">
                <FaTelegram className="task-list-image-icon" />
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
                  {clickedTaskId == task.id ? (
                    <button
                      className="task-list-status-button"
                      id="start"
                      onClick={checkTask}
                      disabled={buttonState !== "Claim"}
                    >
                      {buttonState}
                    </button>
                  ) : (
                    <>
                      <button
                        className="task-list-status-button active-btn"
                        id="start"
                        onClick={() => {
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
          ))}
          {completedTasks && completedTasks.length > 0 && (
            <>
              <hr className="task-hr" />
              {completedTasks.map((task) => (
                <div className="task-list-item" key={task.id}>
                  <div className="task-list-image">
                    <FaTelegram className="task-list-image-icon" />
                  </div>
                  <div className="task-info">
                    <div className="task-list-name">
                      <div className="task-list-name-title title-completed">
                        {task.title}
                      </div>
                      <div className="task-list-name-subtitle title-completed">
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
