import { HabitTracker } from './HabitTracker'
import { GoalProgress } from './GoalProgress'

export function HabitsSection({ habits, goals, onUpdateHabits, onUpdateGoals }) {
  return (
    <div className="habits-section fade-in">
      <HabitTracker habits={habits} onUpdate={onUpdateHabits} />
      <div style={{ marginTop: '24px' }}>
        <GoalProgress goals={goals} onUpdate={onUpdateGoals} />
      </div>
    </div>
  )
}

export default HabitsSection
