import { useState, type ReactElement } from 'react'
import type { AppMode } from './types/app'
import { DiveForm } from './components/DiveForm'
import { DiveList } from './components/DiveList'
import { DiveTable } from './components/DiveTable'
import { Stats } from './components/Shared/Stats'
import { useDiveLog } from './hooks/useDiveLog'
import './App.css'

function App(): ReactElement {
  const { dives, addDive, deleteDive, updateDive, stats } = useDiveLog()
  const [mode, setMode] = useState<AppMode>('edit')

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
            <DiveList
              dives={dives}
              onDelete={deleteDive}
              onUpdate={updateDive}
            />
          </>
        ) : (
          <DiveTable dives={dives} />
        )}
      </main>
    </div>
  )
}

export default App
