export function formatDateLong(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(dateIso: string, time: string): string {
  if (!time) return '—'

  const date = new Date(dateIso + 'T' + time)
  const datePart = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const timePart = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${datePart} ${timePart}`
}

export function formatDateTimeLong(dateIso: string, time: string): string {
  if (!time) return formatDateLong(dateIso)
  return `${formatDateLong(dateIso)} в ${time}`
}
