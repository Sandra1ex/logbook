import { useMemo, useState } from 'react'
import type { Dive } from '../types/dive'

interface DiveTableProps {
  dives: Dive[]
}

type SortKey = 'site' | 'maxDepthM' | 'durationMin'
type SortDir = 'asc' | 'desc'

interface SortState {
  key: SortKey
  dir: SortDir
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function sortDives(dives: Dive[], sort: SortState | null) {
  if (!sort) return dives

  const sorted = [...dives].sort((a, b) => {
    const av = a[sort.key]
    const bv = b[sort.key]

    if (typeof av === 'string' && typeof bv === 'string') {
      return av.localeCompare(bv, 'ru')
    }

    return (av as number) - (bv as number)
  })

  return sort.dir === 'desc' ? sorted.reverse() : sorted
}

const sortableColumns: { key: SortKey; label: string }[] = [
  { key: 'site', label: 'Место' },
  { key: 'maxDepthM', label: 'Глубина' },
  { key: 'durationMin', label: 'Время' },
]

export function DiveTable({ dives }: DiveTableProps) {
  const [sort, setSort] = useState<SortState | null>(null)

  const sorted = useMemo(() => sortDives(dives, sort), [dives, sort])

  function toggleSort(key: SortKey) {
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  function sortIndicator(key: SortKey) {
    if (sort?.key !== key) return '↕'
    return sort.dir === 'asc' ? '↑' : '↓'
  }

  if (dives.length === 0) {
    return (
      <section className="dive-table-section empty">
        <h2>Журнал пуст</h2>
        <p>Переключись в режим редактирования и добавь первое погружение.</p>
      </section>
    )
  }

  return (
    <section className="dive-table-section">
      <h2>Журнал ({dives.length})</h2>

      <div className="table-wrap">
        <table className="dive-table">
          <thead>
            <tr>
              <th>Дата</th>
              {sortableColumns.map(({ key, label }) => (
                <th key={key}>
                  <button
                    type="button"
                    className={`sort-btn${sort?.key === key ? ' active' : ''}`}
                    onClick={() => toggleSort(key)}
                  >
                    {label}
                    <span className="sort-icon" aria-hidden="true">
                      {sortIndicator(key)}
                    </span>
                  </button>
                </th>
              ))}
              <th>Оценка</th>
              <th>Заметки</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((dive) => (
              <tr key={dive.id}>
                <td>
                  <time dateTime={dive.date}>{formatDate(dive.date)}</time>
                </td>
                <td>{dive.site}</td>
                <td>{dive.maxDepthM} м</td>
                <td>{dive.durationMin} мин</td>
                <td>
                  <span
                    className="stars"
                    aria-label={`Оценка ${dive.rating} из 5`}
                  >
                    {'★'.repeat(dive.rating)}
                    {'☆'.repeat(5 - dive.rating)}
                  </span>
                </td>
                <td className="notes-cell">{dive.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
