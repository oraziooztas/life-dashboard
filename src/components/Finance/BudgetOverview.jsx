import { formatCurrency } from '../../utils/helpers'

const categoryLabels = {
  food: 'Cibo',
  transport: 'Trasporti',
  entertainment: 'Svago',
  bills: 'Bollette',
  shopping: 'Shopping',
  health: 'Salute',
  education: 'Istruzione',
  other: 'Altro'
}

const categoryColors = {
  food: '#f85149',
  transport: '#58a6ff',
  entertainment: '#d29922',
  bills: '#8b949e',
  shopping: '#a371f7',
  health: '#3fb950',
  education: '#39c5cf',
  other: '#6e7681'
}

export function BudgetOverview({ transactions, budget }) {
  const currentMonth = new Date().toISOString().slice(0, 7)

  const monthlyTransactions = transactions.filter(t =>
    t.date.startsWith(currentMonth)
  )

  const income = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses
  const budgetUsed = budget > 0 ? Math.round((expenses / budget) * 100) : 0

  const expensesByCategory = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const sortedCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="budget-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {formatCurrency(income)}
          </div>
          <div className="stat-label">Entrate del mese</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--danger)' }}>
            {formatCurrency(expenses)}
          </div>
          <div className="stat-label">Uscite del mese</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: balance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            {formatCurrency(balance)}
          </div>
          <div className="stat-label">Bilancio</div>
        </div>
      </div>

      {budget > 0 && (
        <div className="card budget-card">
          <div className="card-header">
            <h3 className="card-title">Budget Mensile</h3>
            <span className={`badge ${budgetUsed > 100 ? 'badge-danger' : budgetUsed > 80 ? 'badge-warning' : 'badge-success'}`}>
              {budgetUsed}% usato
            </span>
          </div>
          <div className="budget-info">
            <span>{formatCurrency(expenses)} / {formatCurrency(budget)}</span>
            <span>Rimangono: {formatCurrency(Math.max(0, budget - expenses))}</span>
          </div>
          <div className="progress-bar" style={{ height: '12px' }}>
            <div
              className={`progress-fill ${budgetUsed > 100 ? '' : budgetUsed > 80 ? 'warning' : 'success'}`}
              style={{
                width: `${Math.min(budgetUsed, 100)}%`,
                background: budgetUsed > 100 ? 'var(--danger)' : undefined
              }}
            />
          </div>
        </div>
      )}

      {sortedCategories.length > 0 && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Spese per Categoria</h3>
          <div className="category-breakdown">
            {sortedCategories.map(([category, amount]) => {
              const percentage = Math.round((amount / expenses) * 100)
              return (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <div className="category-label">
                      <span
                        className="category-dot"
                        style={{ background: categoryColors[category] }}
                      />
                      {categoryLabels[category] || category}
                    </div>
                    <div className="category-values">
                      <span className="category-amount">{formatCurrency(amount)}</span>
                      <span className="category-percent">{percentage}%</span>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: '6px' }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${percentage}%`,
                        background: categoryColors[category]
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <style>{`
        .budget-card .budget-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .category-breakdown {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .category-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .category-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .category-values {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .category-amount {
          font-weight: 600;
        }
        .category-percent {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  )
}

export default BudgetOverview
