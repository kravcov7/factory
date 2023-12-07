import React, { useState } from 'react';
import styles from "./TaskForm.module.css";
import Button from '../Button/Button';

const TaskForm = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && time) {
      onAddTask({ description, time: parseInt(time, 10) });
      setDescription('');
      setTime('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Time (minutes):
        <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;

