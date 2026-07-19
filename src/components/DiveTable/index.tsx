import { useMemo, useState, type ReactElement } from 'react'
import type { Dive } from '../../types/dive'
import type { DiveTableProps, SortKey, SortState } from './types'
import { PAGE_SIZE } from './types'
import { Stars } from '../Shared/Stars'
import { formatDateShort, formatDateTime } from '../../utils/format'

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



export function DiveTable({ dives }: DiveTableProps): ReactElement {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredDives = useMemo(() => {
    if (!search.trim()) return dives
    const lowerSearch = search.toLowerCase()
    return dives.filter((d) => d.site.toLowerCase().includes(lowerSearch))
  }, [dives, search])

  const sorted = useMemo(() => sortDives(filteredDives, sort), [filteredDives, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function toggleSort(key: SortKey) {
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
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
      <h2>Журнал ({sorted.length})</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск по месту..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrap">
        <table className="dive-table">
          <thead>
            <tr>
              <th>
                <button type="button" className={`sort-btn${sort?.key === 'site' ? ' active' : ''}`} onClick={() => toggleSort('site')}>
                  Место
                  <span className="sort-icon">{sort?.key === 'site' ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
                </button>
              </th>
              <th>
                <button type="button" className={`sort-btn${sort?.key === 'maxDepthM' ? ' active' : ''}`} onClick={() => toggleSort('maxDepthM')}>
                  Глубина
                  <span className="sort-icon">{sort?.key === 'maxDepthM' ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
                </button>
              </th>
              <th>
                <button type="button" className={`sort-btn${sort?.key === 'durationMin' ? ' active' : ''}`} onClick={() => toggleSort('durationMin')}>
                  Время
                  <span className="sort-icon">{sort?.key === 'durationMin' ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
                </button>
              </th>
              <th>Оценка</th>
              <th>Заметки</th>
              <th>Время начала</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((dive: Dive) => (
              <tr key={dive.id}>
                <td>{dive.site}</td>
                <td>{dive.maxDepthM} м</td>
                <td>{dive.durationMin} мин</td>
                <td>
                  <Stars rating={dive.rating} />
                </td>
                <td className="notes-cell">{dive.notes || '—'}</td>
                <td>
                  <time dateTime={dive.time ? dive.date + 'T' + dive.time : dive.date}>
                    {formatDateTime(dive.date, dive.time)}
                  </time>
                </td>
                <td>
                  <time dateTime={dive.date}>{formatDateShort(dive.date)}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sorted.length === 0 && (
        <p className="no-results">Ничего не найдено по запросу "{search}"</p>
      )}
      {sorted.length > 10 && (
        <div className="pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            ←
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </div>
      )}
    </section>
  )
}
