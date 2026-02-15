import { useState } from 'react'
import { BudgetOverview } from './BudgetOverview'
import { TransactionList } from './TransactionList'

export function FinanceSection({ transactions, budget, onUpdateTransactions, onUpdateBudget }) {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [newBudget, setNewBudget] = useState(budget)

  const saveBudget = (e) => {
    e.preventDefault()
    onUpdateBudget(parseFloat(newBudget) || 0)
    setShowBudgetModal(false)
  }

  return (
    <div className="finance-section fade-in">
      <div className="finance-header">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setNewBudget(budget)
            setShowBudgetModal(true)
          }}
        >
          Imposta Budget Mensile
        </button>
      </div>

      <BudgetOverview transactions={transactions} budget={budget} />

      <div style={{ marginTop: '24px' }}>
        <TransactionList
          transactions={transactions}
          onUpdate={onUpdateTransactions}
        />
      </div>

      {showBudgetModal && (
        <div className="modal-overlay" onClick={() => setShowBudgetModal(false)}>
          <div className="modal slide-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Budget Mensile</h3>
              <button className="modal-close" onClick={() => setShowBudgetModal(false)}>×</button>
            </div>
            <form onSubmit={saveBudget}>
              <div className="form-group">
                <label className="form-label">Importo Budget (€)</label>
                <input
                  type="number"
                  className="form-input"
                  value={newBudget}
                  onChange={e => setNewBudget(e.target.value)}
                  step="1"
                  min="0"
                  placeholder="es. 1000"
                />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Imposta 0 per disabilitare il budget
                </p>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowBudgetModal(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .finance-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  )
}

export default FinanceSection
