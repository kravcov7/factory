import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const TodoList = ({ tasks, onCompleteTask, onDeleteTask }) => {
  const [timers, setTimers] = useState({});

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds <= 0) {
      return "00:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const startTimer = (taskId, time) => {
    if (time === 0) {
      return;
    }
    const timerId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTime = prevTimers[taskId]?.time - 1;
        if (updatedTime === 0) {
          clearInterval(prevTimers[taskId].id);
        }
        return {
          ...prevTimers,
          [taskId]: { id: prevTimers[taskId]?.id, time: updatedTime },
        };
      });
    }, 1000);

    setTimers((prevTimers) => ({
      ...prevTimers,
      [taskId]: { id: timerId, time },
    }));
  };

  const handleCompleteTask = (taskId) => {
    onCompleteTask(taskId);
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {tasks?.map((task) => {
          const timerValue =
            timers[task.id]?.time !== undefined
              ? timers[task.id]?.time
              : task.time * 60;
          const timerStyle = {
            color:
              timerValue <= 0 ? "red" : timerValue < 60 ? "yellow" : "inherit",
          };
          return (
            <li key={task.id}>
              <span> {task.description}</span>
              <span style={timerStyle}> - Timer: {formatTime(timerValue)}</span>
              <Button onClick={() => startTimer(task.id, timerValue)}>
                Start Timer
              </Button>
              <Button onClick={() => handleCompleteTask(task.id)}>
                Complete
              </Button>
              <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
