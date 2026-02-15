import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { exportData, importData } from './utils/helpers'
import { Sidebar } from './components/Layout/Sidebar'
import { Header } from './components/Layout/Header'
import { StudySection } from './components/Study/StudySection'
import { ProjectsSection } from './components/Projects/ProjectsSection'
import { HabitsSection } from './components/Habits/HabitsSection'
import { FinanceSection } from './components/Finance/FinanceSection'

function SettingsSection({ onExport, onImport }) {
  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const data = await importData(file)
      onImport(data)
      alert('Dati importati con successo!')
    } catch (error) {
      alert('Errore: ' + error.message)
    }
    e.target.value = ''
  }

  return (
    <div className="settings-section fade-in">
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '20px' }}>Backup & Ripristino</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Esporta i tuoi dati in un file JSON per backup, o importa un backup precedente.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onExport}>
            Esporta Dati
          </button>
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            Importa Dati
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div className="card" style={{ marginTop: '16px' }}>
        <h3 className="card-title" style={{ marginBottom: '20px' }}>Informazioni</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Life Dashboard v1.0<br />
          I dati sono salvati nel browser (LocalStorage).
        </p>
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('study')

  const [exams, setExams] = useLocalStorage('life-dashboard-exams', [])
  const [projects, setProjects] = useLocalStorage('life-dashboard-projects', [])
  const [habits, setHabits] = useLocalStorage('life-dashboard-habits', [])
  const [goals, setGoals] = useLocalStorage('life-dashboard-goals', [])
  const [transactions, setTransactions] = useLocalStorage('life-dashboard-transactions', [])
  const [budget, setBudget] = useLocalStorage('life-dashboard-budget', 0)

  const handleExport = () => {
    exportData({
      exams,
      projects,
      habits,
      goals,
      transactions,
      budget,
      exportedAt: new Date().toISOString()
    })
  }

  const handleImport = (data) => {
    if (data.exams) setExams(data.exams)
    if (data.projects) setProjects(data.projects)
    if (data.habits) setHabits(data.habits)
    if (data.goals) setGoals(data.goals)
    if (data.transactions) setTransactions(data.transactions)
    if (data.budget !== undefined) setBudget(data.budget)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'study':
        return (
          <StudySection
            exams={exams}
            onUpdateExams={setExams}
          />
        )
      case 'projects':
        return (
          <ProjectsSection
            projects={projects}
            onUpdateProjects={setProjects}
          />
        )
      case 'habits':
        return (
          <HabitsSection
            habits={habits}
            goals={goals}
            onUpdateHabits={setHabits}
            onUpdateGoals={setGoals}
          />
        )
      case 'finance':
        return (
          <FinanceSection
            transactions={transactions}
            budget={budget}
            onUpdateTransactions={setTransactions}
            onUpdateBudget={setBudget}
          />
        )
      case 'settings':
        return (
          <SettingsSection
            onExport={handleExport}
            onImport={handleImport}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app-layout">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="main-content">
        <Header section={activeSection} />
        {renderSection()}
      </main>
    </div>
  )
}

export default App
