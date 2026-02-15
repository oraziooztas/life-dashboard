import { useState } from 'react'
import { getWeekDates, isSameDay, generateId, calculateStreak } from '../../utils/helpers'

export function HabitTracker({ habits, onUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [newHabitName, setNewHabitName] = useState('')
  const weekDates = getWeekDates()

  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

  const addHabit = (e) => {
    e.preventDefault()
    if (!newHabitName.trim()) return
    onUpdate([
      ...habits,
      { id: generateId(), name: newHabitName, completedDates: [] }
    ])
    setNewHabitName('')
    setShowModal(false)
  }

  const toggleDay = (habitId, date) => {
    const dateStr = date.toISOString().split('T')[0]
    onUpdate(habits.map(h => {
      if (h.id !== habitId) return h
      const exists = h.completedDates.includes(dateStr)
      return {
        ...h,
        completedDates: exists
          ? h.completedDates.filter(d => d !== dateStr)
          : [...h.completedDates, dateStr]
      }
    }))
  }

  const deleteHabit = (id) => {
    if (confirm('Eliminare questa abitudine?')) {
      onUpdate(habits.filter(h => h.id !== id))
    }
  }

  const isCompleted = (habit, date) => {
    const dateStr = date.toISOString().split('T')[0]
    return habit.completedDates.includes(dateStr)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Habit Tracker</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Aggiungi
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="empty-state">Nessuna abitudine da tracciare</div>
      ) : (
        <div className="habit-grid">
          <div className="habit-header">
            <div className="habit-name-col"></div>
            {weekDates.map((date, i) => (
              <div key={i} className={`day-header ${isSameDay(date, new Date()) ? 'today' : ''}`}>
                <span className="day-name">{dayNames[i]}</span>
                <span className="day-num">{date.getDate()}</span>
              </div>
            ))}
            <div className="streak-col">Streak</div>
          </div>

          {habits.map(habit => {
            const streak = calculateStreak(habit.completedDates)
            return (
              <div key={habit.id} className="habit-row">
                <div className="habit-name-col">
                  <span>{habit.name}</span>
                  <button
                    className="habit-delete"
                    onClick={() => deleteHabit(habit.id)}
                  >
                    ×
                  </button>
                </div>
                {weekDates.map((date, i) => (
                  <div
                    key={i}
                    className={`day-cell ${isCompleted(habit, date) ? 'completed' : ''} ${isSameDay(date, new Date()) ? 'today' : ''}`}
                    onClick={() => toggleDay(habit.id, date)}
                  >
                    {isCompleted(habit, date) && '✓'}
                  </div>
                ))}
                <div className="streak-col">
                  <span className={`streak-badge ${streak >= 7 ? 'hot' : ''}`}>
                    🔥 {streak}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal slide-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nuova Abitudine</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={addHabit}>
              <div className="form-group">
                <label className="form-label">Nome Abitudine</label>
                <input
                  type="text"
                  className="form-input"
                  value={newHabitName}
                  onChange={e => setNewHabitName(e.target.value)}
                  placeholder="es. Meditazione, Esercizio..."
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Aggiungi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .habit-grid {
          overflow-x: auto;
        }
        .habit-header,
        .habit-row {
          display: grid;
          grid-template-columns: 1fr repeat(7, 48px) 70px;
          gap: 8px;
          align-items: center;
        }
        .habit-header {
          margin-bottom: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .day-header {
          text-align: center;
          font-size: 0.75rem;
        }
        .day-header.today {
          color: var(--accent);
        }
        .day-name {
          display: block;
          color: var(--text-secondary);
        }
        .day-num {
          font-weight: 600;
        }
        .habit-row {
          padding: 8px 0;
        }
        .habit-name-col {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }
        .habit-delete {
          opacity: 0;
          background: none;
          border: none;
          color: var(--danger);
          cursor: pointer;
          font-size: 1.2rem;
          transition: opacity 0.2s;
        }
        .habit-row:hover .habit-delete {
          opacity: 1;
        }
        .day-cell {
          width: 48px;
          height: 48px;
          border: 2px solid var(--border);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1.2rem;
        }
        .day-cell:hover {
          border-color: var(--accent);
        }
        .day-cell.today {
          border-color: var(--accent);
        }
        .day-cell.completed {
          background: var(--success);
          border-color: var(--success);
          color: white;
        }
        .streak-col {
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .streak-badge {
          display: inline-block;
          padding: 4px 8px;
          background: var(--border);
          border-radius: 12px;
        }
        .streak-badge.hot {
          background: rgba(255, 100, 0, 0.2);
          color: #ff6400;
        }
        @media (max-width: 768px) {
          .habit-header,
          .habit-row {
            grid-template-columns: 100px repeat(7, 36px) 60px;
            gap: 4px;
          }
          .day-cell {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  )
}

export default HabitTracker
