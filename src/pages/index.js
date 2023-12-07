'use client'

import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TodoList from "@/components/component1/TodoList";
import CompletedList from "@/components/component2/CompletedList";
import TaskForm from "@/components/TaskForm/TaskForm";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "@/utils/hooks/useLocalStorage"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // let value
  // value = localStorage.getItem("tasks") || []
  // const [value, setValue] = useLocalStorage(tasks, []);
  // const [tasks, setTasks] = useLocalStorage(value);
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

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

  return (
    <>
      <Head>
        <title>Список задач</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <TaskForm onAddTask={addTask} />
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
