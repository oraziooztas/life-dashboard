// Date helpers
export function formatDate(date) {
  return new Date(date).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getDaysUntil(date) {
  const now = new Date()
  const target = new Date(date)
  const diff = target - now
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getWeekDates(date = new Date()) {
  const week = []
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay() + 1) // Monday

  for (let i = 0; i < 7; i++) {
    const day = new Date(start)
    day.setDate(start.getDate() + i)
    week.push(day)
  }
  return week
}

export function isSameDay(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.toDateString() === d2.toDateString()
}

// Calculation helpers
export function calculateWeightedAverage(exams) {
  const passed = exams.filter(e => e.status === 'passed' && e.grade)
  if (passed.length === 0) return 0

  const totalWeighted = passed.reduce((sum, e) => sum + (e.grade * e.cfu), 0)
  const totalCfu = passed.reduce((sum, e) => sum + e.cfu, 0)

  return totalCfu > 0 ? (totalWeighted / totalCfu).toFixed(2) : 0
}

export function calculateProjectProgress(tasks) {
  if (!tasks || tasks.length === 0) return 0
  const completed = tasks.filter(t => t.completed).length
  return Math.round((completed / tasks.length) * 100)
}

export function calculateStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0

  const sorted = [...completedDates]
    .map(d => new Date(d).toDateString())
    .sort((a, b) => new Date(b) - new Date(a))

  let streak = 0
  let checkDate = new Date()

  for (const dateStr of sorted) {
    if (dateStr === checkDate.toDateString()) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else if (dateStr === new Date(checkDate.getTime() - 86400000).toDateString()) {
      checkDate.setDate(checkDate.getDate() - 1)
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

// ID generator
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Currency formatter
export function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

// Export/Import helpers
export function exportData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `life-dashboard-backup-${formatDate(new Date()).replace(/\//g, '-')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        resolve(data)
      } catch (error) {
        reject(new Error('File JSON non valido'))
      }
    }
    reader.onerror = () => reject(new Error('Errore nella lettura del file'))
    reader.readAsText(file)
  })
}
