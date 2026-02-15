import { useState } from 'react'
import { generateId } from '../../utils/helpers'

export function TaskList({ tasks, onUpdate }) {
  const [newTask, setNewTask] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    onUpdate([...tasks, { id: generateId(), text: newTask, completed: false }])
    setNewTask('')
  }

  const toggleTask = (id) => {
    onUpdate(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  const deleteTask = (id) => {
    onUpdate(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="task-list">
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          className="form-input"
          placeholder="Aggiungi task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm">+</button>
      </form>

      <ul className="tasks">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label className="task-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="checkmark"></span>
            </label>
            <span className="task-text">{task.text}</span>
            <button
              className="task-delete"
              onClick={() => deleteTask(task.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <style>{`
        .task-form {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .task-form .form-input {
          flex: 1;
          padding: 8px 12px;
        }
        .tasks {
          list-style: none;
        }
        .task-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }
        .task-item:last-child {
          border-bottom: none;
        }
        .task-item.completed .task-text {
          text-decoration: line-through;
          color: var(--text-secondary);
        }
        .task-checkbox {
          position: relative;
          display: flex;
          cursor: pointer;
        }
        .task-checkbox input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .task-checkbox input:checked + .checkmark {
          background: var(--success);
          border-color: var(--success);
        }
        .task-checkbox input:checked + .checkmark::after {
          content: '✓';
          color: white;
          font-size: 12px;
        }
        .task-text {
          flex: 1;
        }
        .task-delete {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0 4px;
        }
        .task-delete:hover {
          color: var(--danger);
        }
      `}</style>
    </div>
  )
}

export default TaskList
