import { useState, useEffect } from 'react'

const sectionTitles = {
  study: 'Studio & Esami',
  projects: 'Progetti',
  habits: 'Obiettivi & Habits',
  finance: 'Finanze',
  settings: 'Impostazioni'
}

export function Header({ section }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <header className="page-header">
      <div className="header-left">
        <h1 className="page-title">{sectionTitles[section] || 'Dashboard'}</h1>
      </div>
      <div className="header-right">
        <div className="header-datetime">
          <span className="header-date">{formatDate(currentTime)}</span>
          <span className="header-time">{formatTime(currentTime)}</span>
        </div>
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .header-datetime {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .header-date {
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-transform: capitalize;
        }

        .header-time {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .header-datetime {
            align-items: flex-start;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
