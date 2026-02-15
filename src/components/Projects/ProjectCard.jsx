import { useState } from 'react'
import { TaskList } from './TaskList'
import { calculateProjectProgress } from '../../utils/helpers'

export function ProjectCard({ project, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const progress = calculateProjectProgress(project.tasks || [])

  const updateTasks = (newTasks) => {
    onUpdate({ ...project, tasks: newTasks })
  }

  const statusColors = {
    active: 'badge-success',
    paused: 'badge-warning',
    completed: 'badge-info'
  }

  const statusLabels = {
    active: 'Attivo',
    paused: 'In pausa',
    completed: 'Completato'
  }

  return (
    <div className="project-card card">
      <div className="project-header" onClick={() => setExpanded(!expanded)}>
        <div className="project-info">
          <h4 className="project-name">{project.name}</h4>
          <span className={`badge ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>
        <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="project-progress">
        <div className="progress-header">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-fill ${progress === 100 ? 'success' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {expanded && (
        <div className="project-tasks slide-in">
          <h5>Task</h5>
          <TaskList tasks={project.tasks || []} onUpdate={updateTasks} />
        </div>
      )}

      <div className="project-actions">
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(project.id)}
        >
          Elimina
        </button>
      </div>

      <style>{`
        .project-card {
          transition: all 0.2s ease;
        }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          margin-bottom: 12px;
        }
        .project-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .project-name {
          font-size: 1.1rem;
          font-weight: 600;
        }
        .expand-icon {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
        .project-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 16px;
        }
        .project-progress {
          margin-bottom: 16px;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 6px;
          color: var(--text-secondary);
        }
        .project-tasks {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 16px;
        }
        .project-tasks h5 {
          margin-bottom: 12px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .project-actions {
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  )
}

export default ProjectCard
