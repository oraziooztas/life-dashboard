import { calculateWeightedAverage } from '../../utils/helpers'

export function GradeStats({ exams }) {
  const passedExams = exams.filter(e => e.status === 'passed')
  const totalCfu = passedExams.reduce((sum, e) => sum + e.cfu, 0)
  const pendingExams = exams.filter(e => e.status === 'pending')
  const pendingCfu = pendingExams.reduce((sum, e) => sum + e.cfu, 0)
  const weightedAverage = calculateWeightedAverage(exams)

  const estimatedGraduation = weightedAverage > 0
    ? Math.round(weightedAverage * 110 / 30)
    : 0

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{weightedAverage}</div>
        <div className="stat-label">Media Ponderata</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{totalCfu}</div>
        <div className="stat-label">CFU Ottenuti</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{passedExams.length}</div>
        <div className="stat-label">Esami Superati</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{pendingExams.length}</div>
        <div className="stat-label">Esami Rimanenti</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{pendingCfu}</div>
        <div className="stat-label">CFU Mancanti</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{estimatedGraduation || '-'}</div>
        <div className="stat-label">Voto Laurea Stimato</div>
      </div>
    </div>
  )
}

export default GradeStats
