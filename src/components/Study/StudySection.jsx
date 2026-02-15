import { GradeStats } from './GradeStats'
import { ExamList } from './ExamList'

export function StudySection({ exams, onUpdateExams }) {
  return (
    <div className="study-section fade-in">
      <GradeStats exams={exams} />
      <ExamList exams={exams} onUpdate={onUpdateExams} />
    </div>
  )
}

export default StudySection
