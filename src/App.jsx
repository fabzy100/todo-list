import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';


function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task, completed: false }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
    setEditTask(null);
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditTask(taskToEdit);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm
        onSubmit={editTask ? (updatedTask) => updateTask(editTask.id, updatedTask) : addTask}
        existingTask={editTask}
        editTask={!!editTask}
      />
      <TaskList
        tasks={tasks}
        onComplete={completeTask}
        onEdit={handleEdit}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
