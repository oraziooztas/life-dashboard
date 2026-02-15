import { useState } from 'react'
import { formatDate, formatCurrency, generateId } from '../../utils/helpers'

const categories = [
  { value: 'food', label: 'Cibo' },
  { value: 'transport', label: 'Trasporti' },
  { value: 'entertainment', label: 'Svago' },
  { value: 'bills', label: 'Bollette' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Salute' },
  { value: 'education', label: 'Istruzione' },
  { value: 'salary', label: 'Stipendio' },
  { value: 'other', label: 'Altro' }
]

export function TransactionList({ transactions, onUpdate }) {
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'other',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate([
      { ...formData, id: generateId(), amount: parseFloat(formData.amount) },
      ...transactions
    ])
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'other',
      date: new Date().toISOString().split('T')[0]
    })
    setShowModal(false)
  }

  const deleteTransaction = (id) => {
    if (confirm('Eliminare questa transazione?')) {
      onUpdate(transactions.filter(t => t.id !== id))
    }
  }

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter)

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  const getCategoryLabel = (value) =>
    categories.find(c => c.value === value)?.label || value

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Transazioni</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Aggiungi
        </button>
      </div>

      <div className="transaction-filters">
        {['all', 'income', 'expense'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Tutte' : f === 'income' ? 'Entrate' : 'Uscite'}
          </button>
        ))}
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="empty-state">Nessuna transazione</div>
      ) : (
        <div className="transaction-list">
          {sortedTransactions.map(t => (
            <div key={t.id} className="transaction-item">
              <div className="transaction-info">
                <span className="transaction-desc">{t.description}</span>
                <span className="transaction-meta">
                  {getCategoryLabel(t.category)} • {formatDate(t.date)}
                </span>
              </div>
              <div className="transaction-right">
                <span className={`transaction-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                <button
                  className="transaction-delete"
                  onClick={() => deleteTransaction(t.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal slide-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nuova Transazione</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Descrizione</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Importo (€)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="expense">Uscita</option>
                    <option value="income">Entrata</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Categoria</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
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
        .transaction-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .filter-btn {
          padding: 6px 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.85rem;
        }
        .filter-btn:hover {
          border-color: var(--accent);
        }
        .filter-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .transaction-list {
          display: flex;
          flex-direction: column;
        }
        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .transaction-item:last-child {
          border-bottom: none;
        }
        .transaction-desc {
          font-weight: 500;
        }
        .transaction-meta {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: block;
          margin-top: 2px;
        }
        .transaction-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .transaction-amount {
          font-weight: 600;
          font-size: 1rem;
        }
        .transaction-amount.income {
          color: var(--success);
        }
        .transaction-amount.expense {
          color: var(--danger);
        }
        .transaction-delete {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .transaction-item:hover .transaction-delete {
          opacity: 1;
        }
        .transaction-delete:hover {
          color: var(--danger);
        }
      `}</style>
    </div>
  )
}

export default TransactionList
