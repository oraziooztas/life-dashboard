import { useState } from 'react'

const menuItems = [
  { id: 'study', label: 'Studio', icon: '📚' },
  { id: 'projects', label: 'Progetti', icon: '🚀' },
  { id: 'habits', label: 'Obiettivi', icon: '🎯' },
  { id: 'finance', label: 'Finanze', icon: '💰' },
]

export function Sidebar({ activeSection, onSectionChange }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo">Life Dashboard</h1>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                onSectionChange(item.id)
                setMobileOpen(false)
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => onSectionChange('settings')}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Impostazioni</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <style>{`
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 8px 12px;
          color: var(--text-primary);
          font-size: 1.25rem;
          cursor: pointer;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 240px;
          height: 100vh;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent);
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          border-radius: var(--radius);
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          background: var(--border);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(88, 166, 255, 0.15);
          color: var(--accent);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid var(--border);
        }

        .sidebar-overlay {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
        }
      `}</style>
    </>
  )
}

export default Sidebar
