# Life Dashboard

A personal productivity dashboard built with React and Vite. Track university exams, manage side projects, build habits, and monitor finances -- all in one place with data stored locally in the browser.

## Features

- **Study Tracker:** Log university exams with grades, calculate weighted GPA, and view grade statistics
- **Project Manager:** Create and manage side projects with task lists, status filters (Active, Paused, Completed), and progress tracking
- **Habit Tracker:** Track daily habits with streak counting and set measurable goals with progress bars
- **Finance Manager:** Record income and expenses, set monthly budgets, and visualize spending with budget overviews
- **Data Portability:** Export all data to JSON for backup and import from previous backups
- **Offline-First:** All data persisted in LocalStorage -- no account or server required
- **Responsive Layout:** Sidebar navigation with section-based views

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Language:** JavaScript (JSX)
- **State Management:** React useState + custom `useLocalStorage` hook
- **Styling:** Custom CSS with CSS variables
- **Storage:** Browser LocalStorage

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation

```bash
git clone <repository-url>
cd life-dashboard
npm install
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
life-dashboard/
├── src/
│   ├── App.jsx                          # Root component with section routing
│   ├── main.jsx                         # Entry point
│   ├── index.css                        # Global styles and CSS variables
│   ├── hooks/
│   │   └── useLocalStorage.js           # Custom hook for persistent state
│   ├── utils/
│   │   └── helpers.js                   # Export/import utilities, ID generation
│   └── components/
│       ├── Layout/
│       │   ├── Sidebar.jsx              # Navigation sidebar
│       │   └── Header.jsx               # Section header
│       ├── Study/
│       │   ├── StudySection.jsx         # Study section container
│       │   ├── ExamList.jsx             # Exam CRUD list
│       │   └── GradeStats.jsx           # Grade statistics and GPA
│       ├── Projects/
│       │   ├── ProjectsSection.jsx      # Projects section with filters
│       │   ├── ProjectCard.jsx          # Individual project card
│       │   └── TaskList.jsx             # Task management within projects
│       ├── Habits/
│       │   ├── HabitsSection.jsx        # Habits section container
│       │   ├── HabitTracker.jsx         # Daily habit tracking
│       │   └── GoalProgress.jsx         # Goal setting and progress
│       └── Finance/
│           ├── FinanceSection.jsx       # Finance section with budget modal
│           ├── BudgetOverview.jsx       # Budget vs. spending visualization
│           └── TransactionList.jsx      # Transaction CRUD list
├── index.html
├── vite.config.js
└── package.json
```

## Notes

- All data lives in the browser's LocalStorage under keys prefixed with `life-dashboard-`. Clearing browser data will erase all records.
- The export feature generates a timestamped JSON file containing all sections (exams, projects, habits, goals, transactions, budget).
- No backend or authentication is required -- the app is fully client-side.
- The Settings section provides backup/restore functionality and app version information.
