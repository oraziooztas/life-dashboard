# DEVLOG

Log cronologico di decisioni, problemi e lezioni per questo progetto.

---

## [2026-02-18] — Sync docs iniziale

**Cosa fatto:**
- Dashboard personale React + Vite con 4 sezioni: Studio/Esami, Progetti, Habits, Finanze
- Tutti i 22 componenti creati e funzionanti (stato COMPLETATO in PROGRESS.md)
- Persistenza dati locale tramite hook useLocalStorage (nessun backend)
- Layout con Sidebar + Header condivisi, navigazione tra sezioni
- Studio: lista esami, media ponderata, CFU, stima voto laurea
- Progetti: card con task, progress bar, filtri per stato
- Habits: tracker settimanale con streak, obiettivi con progress bar
- Finanze: budget mensile, lista transazioni, breakdown categorie
- Settings: Export/Import JSON per backup manuale dei dati

**Decisioni prese:**
- Vite invece di Next.js per semplicità — nessun SSR necessario, è una SPA locale
- localStorage come unico store — nessun backend, nessun account, privacy totale
- React 18 + JavaScript (non TypeScript) per velocità di sviluppo iniziale
- Architettura a sezioni con componenti isolati per domain (Study, Projects, Habits, Finance)
- useLocalStorage custom hook centralizzato per gestire serializzazione/deserializzazione

**Problemi incontrati:**
- Nessuno (sync iniziale)

**Lezioni apprese:**
- localStorage con hook custom evita boilerplate JSON.parse/stringify in ogni componente
- La stima voto laurea richiede calcolo ponderato CFU non semplice media aritmetica
- helpers.js centralizza calcoli ripetuti tra componenti (es. media, streak, budget)

**Prossimi passi:**
- Aggiungere grafici per visualizzazione trend finanze e progress habits
- Valutare migrazione a TypeScript per type safety su strutture dati complesse
- Aggiungere export PDF oltre a JSON
- Considerare sync remoto opzionale (Supabase) per accesso multi-device
