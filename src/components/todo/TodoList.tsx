import { useState } from "react";
import classes from './TodoList.module.css'

export default function TodoList() {
  const [tasks, setTasks] = useState([
    "Eat Breakfast",
    "Take a shower",
    "Walk the dog",
  ]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
    console.log(newTask);
  }

  function addTask() {
    if (newTask) {
        setTasks(pt => [...pt, newTask]);
        setNewTask('');
    }
  }

  function deleteTask(index: number) {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks)
  }

  function moveTaskUp(index: number) {
     if (index > 0) {
        const updatedTasks = tasks.slice();
        [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
        setTasks(updatedTasks);
     }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
        const updatedTasks = tasks.slice();
        [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        setTasks(updatedTasks);
     }
  }

  function enterHit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTask()
    }
  }

  return (
    <div className={classes.todo_list}>
      <h1>To-Do-List</h1>
      <div>
        <input
          id="todo"
          type="text"
          placeholder="Type a task"
          value={newTask}
          onChange={handleInputChange}
          onKeyUp={enterHit}
        />
        <button 
            className={classes.add_button}
            onClick={addTask}>Add
        </button>
      </div>
      <ol>
        {tasks.map((task, idx) => (
          <li key={idx}>
            <span className={classes.text}>{task}</span>
            <button 
                className={classes.delete_button}
                onClick={() => deleteTask(idx)}>Delete
            </button>
             <button 
                className={classes.move_button}
                onClick={() => moveTaskUp(idx)}>☝️
            </button>
            <button 
                className={classes.move_button}
                onClick={() => moveTaskDown(idx)}>👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
