import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const TodoList = ({ tasks, onCompleteTask, onDeleteTask }) => {
  const [timers, setTimers] = useState({});

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = (taskId, time) => {
    const timerId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTime = prevTimers[taskId]?.time - 1;
        if (updatedTime <= 0) {
          clearInterval(prevTimers[taskId].id);
          // onCompleteTask(taskId);
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
    clearInterval(timers[taskId]?.id);
    onCompleteTask(taskId);
  };



  const handleDeleteTask = (taskId) => {
    clearInterval(timers[taskId]?.id);
    onDeleteTask(taskId);
  };

  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem('timers')) || {};
    setTimers(storedTimers);

    return () => {
      Object.values(timers).forEach((timer) => clearInterval(timer.id));
    };
  }, []); 

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = {};
        Object.keys(prevTimers).forEach((taskId) => {
          const updatedTime = prevTimers[taskId].time - 1;
          if (updatedTime <= 0) {
            clearInterval(prevTimers[taskId].id);
            // onCompleteTask(taskId);
          } else {
            updatedTimers[taskId] = { ...prevTimers[taskId], time: updatedTime };
          }
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onCompleteTask]);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {tasks?.map((task) => {
          const timerValue = timers[task.id]?.time || task.time * 60;
          const timerStyle = {
            color: timerValue <= 0 ? 'red' : timerValue <= 600 ? 'yellow' : 'inherit',
          };
          return (
            <li key={task.id} style={{ backgroundColor: task.isDueSoon ? 'yellow' : 'bl' }}>
              <span> {task.description}</span>
              <span style={timerStyle}> - Timer: {formatTime(timerValue)}</span>
              <Button onClick={() => startTimer(task.id, timerValue)}>Start Timer</Button>
              <Button onClick={() => handleCompleteTask(task.id)}>Complete</Button>
              <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;