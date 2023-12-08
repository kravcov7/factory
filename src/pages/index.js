
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TodoList from "@/components/component1/TodoList";
import CompletedList from "@/components/component2/CompletedList";
import TaskForm from "@/components/TaskForm/TaskForm";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: uuidv4() }]);
    localStorage.setItem(
      "tasks",
      JSON.stringify([...tasks, { ...newTask, id: uuidv4() }])
    );
  };

  const completeTask = (taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== taskId));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify([...completedTasks, completedTask])
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task.id !== taskId))
    );
  };

  const deleteTask = (taskId) => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task.id !== taskId))
    );
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => {
    localStorage.removeItem("completedTasks");
    setCompletedTasks([]);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];

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
