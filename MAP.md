# MAP — Project Overview

> Dashboard personale React/Vite SPA per tracciare esami universitari, progetti, habit settimanali e finanze personali, con persistenza localStorage e export JSON.

## Struttura

```
life-dashboard/
├── src/
│   ├── main.jsx                    # Entry point React
│   ├── App.jsx                     # Routing tra sezioni, stato globale
│   ├── index.css                   # Stili globali
│   ├── hooks/
│   │   └── useLocalStorage.js      # Hook per persistenza dati
│   ├── utils/
│   │   └── helpers.js              # Funzioni calcolo (media, streak, budget)
│   └── components/
│       ├── Layout/
│       │   ├── Sidebar.jsx         # Navigazione laterale tra sezioni
│       │   └── Header.jsx          # Header con titolo sezione corrente
│       ├── Study/
│       │   ├── StudySection.jsx    # Container sezione studio
│       │   ├── ExamList.jsx        # Lista esami con voti e CFU
│       │   └── GradeStats.jsx      # Media ponderata, CFU totali, stima laurea
│       ├── Projects/
│       │   ├── ProjectsSection.jsx # Container sezione progetti
│       │   ├── ProjectCard.jsx     # Card con task list e progress bar
│       │   └── TaskList.jsx        # Lista task con checkbox
│       ├── Habits/
│       │   ├── HabitsSection.jsx   # Container sezione habits
│       │   ├── HabitTracker.jsx    # Tracker settimanale (checkbox per giorno)
│       │   └── GoalProgress.jsx    # Obiettivi con progress bar
│       └── Finance/
│           ├── FinanceSection.jsx  # Container sezione finanze
│           ├── BudgetOverview.jsx  # Budget mensile e saldo rimanente
│           └── TransactionList.jsx # Lista transazioni con categorie
├── index.html
├── vite.config.js
├── package.json
└── PROGRESS.md                     # Stato completamento iniziale
```

## File chiave

| File | Cosa fa |
|------|---------|
| `src/App.jsx` | Stato globale, routing tra sezioni (Studio/Progetti/Habits/Finanze/Settings) |
| `src/hooks/useLocalStorage.js` | Persistenza automatica in localStorage con serializzazione JSON |
| `src/utils/helpers.js` | Media ponderata CFU, calcolo streak habits, aggregazioni budget |
| `src/components/Study/GradeStats.jsx` | Calcola media ponderata, CFU accumulati, stima voto laurea |
| `src/components/Finance/BudgetOverview.jsx` | Confronto budget vs speso per categoria |

## Entry Points

| Azione | Comando |
|--------|---------|
| Dev server | `npm run dev` |
| Build produzione | `npm run build` |
| Preview build | `npm run preview` |

## Convenzioni

- **Linguaggio:** JavaScript (JSX), React 18
- **Stile:** CSS custom (index.css + stili inline nei componenti)
- **Database:** localStorage (nessun backend)
- **Deploy:** N/A (SPA locale, aperta con Vite o servita staticamente)

## Note

- Tutti i dati persistono in localStorage — nessun account necessario
- Export/Import JSON disponibile in Settings per backup
- Per avviare: `npm install && npm run dev` (vedi PROGRESS.md per path storico)
- Possibile estensione futura: sync Supabase per accesso multi-device
