import React from "react";
import Button from "../Button/Button";

const CompletedList = ({ completedTasks = [], onClearCompleted }) => {


  return (
    <div>
      <h2>Completed List</h2>
      {completedTasks ? (
        <ul>
          {completedTasks?.map((task) => (
            <li key={task.id}>
              <span>{task?.time}</span>
              <span>{task?.description}</span>
            </li>
          ))}
        </ul>
      ) : null }
      {completedTasks.length ? (
        <Button onClick={onClearCompleted}>Clear Completed</Button>
      ) : null}
    </div>
  );
};

export default CompletedList;
