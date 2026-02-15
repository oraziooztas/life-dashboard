import { useState } from 'react'
import { formatDate, getDaysUntil, generateId } from '../../utils/helpers'

export function GoalProgress({ goals, onUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    target: 100,
    current: 0,
    unit: '',
    deadline: ''
  })

  const addGoal = (e) => {
    e.preventDefault()
    onUpdate([...goals, { ...formData, id: generateId() }])
    setFormData({ name: '', target: 100, current: 0, unit: '', deadline: '' })
    setShowModal(false)
  }

  const updateProgress = (id, newCurrent) => {
    onUpdate(goals.map(g =>
      g.id === id ? { ...g, current: Math.max(0, Math.min(newCurrent, g.target)) } : g
    ))
  }

  const deleteGoal = (id) => {
    if (confirm('Eliminare questo obiettivo?')) {
      onUpdate(goals.filter(g => g.id !== id))
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Obiettivi</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Aggiungi
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state">Nessun obiettivo impostato</div>
      ) : (
        <div className="goals-list">
          {goals.map(goal => {
            const progress = Math.round((goal.current / goal.target) * 100)
            const daysLeft = goal.deadline ? getDaysUntil(goal.deadline) : null
            const isCompleted = progress >= 100

            return (
              <div key={goal.id} className={`goal-item ${isCompleted ? 'completed' : ''}`}>
                <div className="goal-header">
                  <div className="goal-info">
                    <h4 className="goal-name">{goal.name}</h4>
                    {goal.deadline && (
                      <span className={`goal-deadline ${daysLeft <= 7 ? 'urgent' : ''}`}>
                        {daysLeft > 0 ? `${daysLeft} giorni rimasti` : daysLeft === 0 ? 'Scade oggi!' : 'Scaduto'}
                      </span>
                    )}
                  </div>
                  <button
                    className="goal-delete"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    ×
                  </button>
                </div>

                <div className="goal-progress-section">
                  <div className="progress-info">
                    <span>{goal.current} / {goal.target} {goal.unit}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${isCompleted ? 'success' : progress >= 75 ? 'warning' : ''}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                {!isCompleted && (
                  <div className="goal-controls">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateProgress(goal.id, goal.current - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="progress-input"
                      value={goal.current}
                      onChange={e => updateProgress(goal.id, parseInt(e.target.value) || 0)}
                    />
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => updateProgress(goal.id, goal.current + 1)}
                    >
                      +
                    </button>
                  </div>
                )}

                {isCompleted && (
                  <div className="goal-completed-badge">
                    ✓ Completato!
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal slide-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nuovo Obiettivo</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={addGoal}>
              <div className="form-group">
                <label className="form-label">Nome Obiettivo</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="es. Leggere 12 libri"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Target</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.target}
                    onChange={e => setFormData({...formData, target: parseInt(e.target.value)})}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Unità</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.unit}
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                    placeholder="es. libri, km, ore"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Scadenza (opzionale)</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.deadline}
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Crea Obiettivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .goal-item {
          padding: 16px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }
        .goal-item.completed {
          border-color: var(--success);
        }
        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .goal-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .goal-deadline {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .goal-deadline.urgent {
          color: var(--warning);
        }
        .goal-delete {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
        }
        .goal-delete:hover {
          color: var(--danger);
        }
        .goal-progress-section {
          margin-bottom: 12px;
        }
        .progress-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .goal-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .progress-input {
          width: 80px;
          text-align: center;
          padding: 6px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
        }
        .goal-completed-badge {
          color: var(--success);
          font-weight: 600;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default GoalProgress
