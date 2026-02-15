import { useState } from 'react'
import { formatDate, getDaysUntil, generateId } from '../../utils/helpers'

export function ExamList({ exams, onUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [editingExam, setEditingExam] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    cfu: 6,
    date: '',
    grade: '',
    status: 'pending'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingExam) {
      onUpdate(exams.map(ex =>
        ex.id === editingExam.id ? { ...formData, id: ex.id } : ex
      ))
    } else {
      onUpdate([...exams, { ...formData, id: generateId() }])
    }
    closeModal()
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingExam(null)
    setFormData({ name: '', cfu: 6, date: '', grade: '', status: 'pending' })
  }

  const openEdit = (exam) => {
    setEditingExam(exam)
    setFormData(exam)
    setShowModal(true)
  }

  const deleteExam = (id) => {
    if (confirm('Eliminare questo esame?')) {
      onUpdate(exams.filter(ex => ex.id !== id))
    }
  }

  const sortedExams = [...exams].sort((a, b) => {
    if (a.status === 'pending' && b.status === 'passed') return -1
    if (a.status === 'passed' && b.status === 'pending') return 1
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Lista Esami</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Aggiungi
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="empty-state">Nessun esame registrato</div>
      ) : (
        <div className="exam-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Esame</th>
                <th>CFU</th>
                <th>Data</th>
                <th>Voto</th>
                <th>Stato</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedExams.map(exam => {
                const daysUntil = exam.date ? getDaysUntil(exam.date) : null
                return (
                  <tr key={exam.id}>
                    <td>{exam.name}</td>
                    <td>{exam.cfu}</td>
                    <td>
                      {exam.date && (
                        <>
                          {formatDate(exam.date)}
                          {exam.status === 'pending' && daysUntil !== null && (
                            <span className={`days-badge ${daysUntil <= 7 ? 'urgent' : ''}`}>
                              {daysUntil > 0 ? `tra ${daysUntil}g` : daysUntil === 0 ? 'oggi' : 'passato'}
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td>{exam.grade || '-'}</td>
                    <td>
                      <span className={`badge ${exam.status === 'passed' ? 'badge-success' : 'badge-warning'}`}>
                        {exam.status === 'passed' ? 'Superato' : 'Da fare'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(exam)}>
                          Modifica
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteExam(exam.id)}>
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal slide-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingExam ? 'Modifica Esame' : 'Nuovo Esame'}
              </h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Esame</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">CFU</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.cfu}
                    onChange={e => setFormData({...formData, cfu: parseInt(e.target.value)})}
                    min="1"
                    max="30"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Stato</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="pending">Da fare</option>
                    <option value="passed">Superato</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Voto (se superato)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value ? parseInt(e.target.value) : ''})}
                    min="18"
                    max="31"
                    disabled={formData.status !== 'passed'}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingExam ? 'Salva' : 'Aggiungi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .exam-table-wrapper {
          overflow-x: auto;
        }
        .days-badge {
          display: inline-block;
          margin-left: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .days-badge.urgent {
          color: var(--warning);
          font-weight: 600;
        }
        .action-btns {
          display: flex;
          gap: 8px;
        }
      `}</style>
    </div>
  )
}

export default ExamList
