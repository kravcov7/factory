import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TodoList from "@/components/component1/TodoList";
import CompletedList from "@/components/component2/CompletedList";
import TaskForm from "@/components/TaskForm/TaskForm";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handlePause();
            // Таймер достиг нуля
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, minutes, seconds]);

  return (
    <div>
      <div>
        <label>
          Минуты:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Секунды:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <div>
        <button onClick={handleStart}>Старт</button>
        <button onClick={handlePause}>Пауза</button>
        <button onClick={handleReset}>Сброс</button>
      </div>
      <div>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: uuidv4() }]);
  };

  const completeTask = (taskId) => {
    // clearInterval(timers[taskId]);
    const completedTask = tasks.find((task) => task.id === taskId);
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const deleteTask = (taskId) => {
    // clearInterval(timers[taskId]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => {
    setCompletedTasks([]);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];

    console.log("Loaded tasks from localStorage:", storedTasks);
    console.log(
      "Loaded completed tasks from localStorage:",
      storedCompletedTasks
    );

    setTasks(storedTasks);
    setCompletedTasks(() => storedCompletedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  return (
    <>
      <Head>
        <title>Список задач</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <TaskForm onAddTask={addTask} />
        <Timer />
        <div className={styles.tasksContainer}>
          <TodoList
            tasks={tasks}
            onCompleteTask={completeTask}
            onDeleteTask={deleteTask}
          />
          <CompletedList
            completedTasks={completedTasks}
            onClearCompleted={clearCompleted}
          />
        </div>
      </main>
    </>
  );
}
