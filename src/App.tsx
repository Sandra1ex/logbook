import { useState } from 'react'
import { DiveForm } from './components/DiveForm'
import { DiveList } from './components/DiveList'
import { DiveTable } from './components/DiveTable'
import { Stats } from './components/Shared/Stats'
import { useDiveLog } from './hooks/useDiveLog'
import './App.css'

type Mode = 'edit' | 'view'

function App() {
  const { dives, addDive, deleteDive, stats } = useDiveLog()
  const [mode, setMode] = useState<Mode>('edit')

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon" aria-hidden="true">
          🤿
        </div>
        <div className="header-text">
          <h1>Logbook</h1>
          <p>Дневник погружений</p>
        </div>
        <div className="mode-toggle" role="group" aria-label="Режим приложения">
          <button
            type="button"
            className={mode === 'edit' ? 'active' : ''}
            onClick={() => setMode('edit')}
          >
            Редактирование
          </button>
          <button
            type="button"
            className={mode === 'view' ? 'active' : ''}
            onClick={() => setMode('view')}
          >
            Просмотр
          </button>
        </div>
      </header>

      <Stats
        total={stats.total}
        maxDepth={stats.maxDepth}
        totalMinutes={stats.totalMinutes}
      />

      <main className={mode === 'edit' ? 'main' : 'main main-view'}>
        {mode === 'edit' ? (
          <>
            <DiveForm onSubmit={addDive} />
            <DiveList dives={dives} onDelete={deleteDive} />
          </>
        ) : (
          <DiveTable dives={dives} />
        )}
      </main>
    </div>
  )
}

export default App
