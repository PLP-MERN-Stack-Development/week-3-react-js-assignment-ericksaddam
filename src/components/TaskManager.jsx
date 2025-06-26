import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PRIORITY_OPTIONS = [
  { label: 'High', value: 'high', color: 'red' },
  { label: 'Medium', value: 'medium', color: 'yellow' },
  { label: 'Low', value: 'low', color: 'green' },
];

export default function TaskManager() {
  // State
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingDue, setEditingDue] = useState('');
  const [editingPriority, setEditingPriority] = useState('medium');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Add Task
  const addTask = (text, due, priority) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
          due: due || '',
          priority: priority || 'medium',
        },
      ]);
      setNewTaskText('');
      setNewTaskDue('');
      setNewTaskPriority('medium');
    }
  };

  // Edit Task
  const startEditTask = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
    setEditingDue(task.due || '');
    setEditingPriority(task.priority || 'medium');
  };

  const saveEditTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id
        ? { ...task, text: editingText, due: editingDue, priority: editingPriority }
        : task
    ));
    setEditingId(null);
    setEditingText('');
    setEditingDue('');
    setEditingPriority('medium');
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Bulk Clear Completed
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setShowConfirmClear(false);
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Task Counts
  const totalCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;


  return (
    <div className="task-manager-container">
      <h2 className="task-manager-title">Task Manager</h2>
      <div className="add-task-form" aria-label="Add new task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="add-task-input"
          aria-label="Task description"
          required
        />
        <input
          type="date"
          value={newTaskDue}
          onChange={(e) => setNewTaskDue(e.target.value)}
          className="add-task-date"
          aria-label="Due date"
        />
        <select
          value={newTaskPriority}
          onChange={e => setNewTaskPriority(e.target.value)}
          className="add-task-priority"
          aria-label="Priority"
        >
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => addTask(newTaskText, newTaskDue, newTaskPriority)}
          className="add-task-button"
        >
          Add Task
        </button>
      </div>
      
      <div className="controls-bar">
        <div className="filter-buttons">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : 'inactive'}`}
            aria-pressed={filter === 'all'}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-button ${filter === 'active' ? 'active' : 'inactive'}`}
            aria-pressed={filter === 'active'}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`filter-button ${filter === 'completed' ? 'active' : 'inactive'}`}
            aria-pressed={filter === 'completed'}
          >
            Completed
          </button>
        </div>
        <div className="task-counts">
          <span>Total: <span className="task-count-number">{totalCount}</span></span>
          <span>Active: <span className="task-count-number">{activeCount}</span></span>
          <span>Completed: <span className="task-count-number">{completedCount}</span></span>
        </div>
        <button
          onClick={() => setShowConfirmClear(true)}
          className="clear-completed-button"
          disabled={completedCount === 0}
          aria-disabled={completedCount === 0}
        >
          Clear Completed
        </button>
      </div>

      {showConfirmClear && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p className="confirm-message">Are you sure you want to clear all completed tasks?</p>
            <div className="confirm-buttons">
              <button className="confirm-yes" onClick={clearCompleted} autoFocus>Yes</button>
              <button className="confirm-no" onClick={() => setShowConfirmClear(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      <ul className="task-list" aria-label="Task list">
        {filteredTasks.length === 0 ? (
          <li className="empty-message">No tasks to show.</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="task-item"
              tabIndex={0}
              aria-label={task.text}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                />
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                      className="edit-input"
                      aria-label="Edit task description"
                      autoFocus
                    />
                    <input
                      type="date"
                      value={editingDue}
                      onChange={e => setEditingDue(e.target.value)}
                      className="edit-date"
                      aria-label="Edit due date"
                    />
                    <select
                      value={editingPriority}
                      onChange={e => setEditingPriority(e.target.value)}
                      className="edit-priority"
                      aria-label="Edit priority"
                    >
                      {PRIORITY_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <button
                      className="save-button"
                      onClick={() => saveEditTask(task.id)}
                      aria-label="Save edit"
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingId(null)}
                      aria-label="Cancel edit"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className={`task-text ${task.completed ? 'completed' : ''}`}
                    >
                      {task.text}
                    </span>
                    <span className="task-meta">
                      {task.due && (
                        <span className="due-date-badge">Due: <span className="due-date-text">{task.due}</span></span>
                      )}
                      <span className={`priority-badge priority-${task.priority}`}>
                        {PRIORITY_OPTIONS.find(opt => opt.value === task.priority)?.label || 'Medium'}
                      </span>
                    </span>
                  </>
                )}
              </div>
              <div className="task-actions">
                {editingId !== task.id && (
                  <button
                    className="edit-button"
                    onClick={() => startEditTask(task)}
                    aria-label="Edit task"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}