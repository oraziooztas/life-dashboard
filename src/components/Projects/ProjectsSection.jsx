import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { generateId } from '../../utils/helpers'

export function ProjectsSection({ projects, onUpdateProjects }) {
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateProjects([
      ...projects,
      { ...formData, id: generateId(), tasks: [] }
    ])
    setFormData({ name: '', description: '', status: 'active' })
    setShowModal(false)
  }

  const updateProject = (updatedProject) => {
    onUpdateProjects(projects.map(p =>
      p.id === updatedProject.id ? updatedProject : p
    ))
  }

  const deleteProject = (id) => {
    if (confirm('Eliminare questo progetto?')) {
      onUpdateProjects(projects.filter(p => p.id !== id))
    }
  }

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.status === filter)

  const projectCounts = {
    all: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    paused: projects.filter(p => p.status === 'paused').length,
    completed: projects.filter(p => p.status === 'completed').length
  }

  return (
    <div className="projects-section fade-in">
      <div className="projects-toolbar">
        <div className="filter-tabs">
          {['all', 'active', 'paused', 'completed'].map(f => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Tutti' : f === 'active' ? 'Attivi' : f === 'paused' ? 'In pausa' : 'Completati'}
              <span className="filter-count">{projectCounts[f]}</span>
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Nuovo Progetto
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="card empty-state">
          Nessun progetto {filter !== 'all' ? 'in questa categoria' : ''}
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdate={updateProject}
              onDelete={deleteProject}
            />
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal slide-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nuovo Progetto</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Progetto</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Descrizione</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stato</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Attivo</option>
                  <option value="paused">In pausa</option>
                  <option value="completed">Completato</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Crea Progetto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .projects-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-tab:hover {
          border-color: var(--accent);
        }
        .filter-tab.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .filter-count {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.75rem;
        }
        .filter-tab:not(.active) .filter-count {
          background: var(--border);
        }
        .projects-grid {
          display: grid;
          gap: 16px;
        }
        textarea.form-input {
          resize: vertical;
          min-height: 80px;
        }
      `}</style>
    </div>
  )
}

export default ProjectsSection
