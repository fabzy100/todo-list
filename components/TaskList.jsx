import React from 'react';
import TaskItem from './TaskItem'



const TaskList = ({ tasks, onComplete, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new task!</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
