export const GAMES_COLLECTION = 'games'

export function createEmptyGameForm() {
  return {
    title: '',
    slug: '',
    description: '',
    audience: 'Docentes y estudiantes',
    engine: 'HTML + JS',
    library: 'Vanilla / compatible con anime.js, PixiJS, Phaser, etc.',
    tags: '',
    status: 'published',
  }
}

export function slugifyGameName(input = '') {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80) || `game-${Date.now()}`
}

export function buildGameShareUrl(game, origin = typeof window !== 'undefined' ? window.location.origin : '') {
  if (!game?.htmlUrl || !origin) return ''
  const params = new URLSearchParams({ src: game.htmlUrl })
  return `${origin}/share/${encodeURIComponent(game.slug || game.id || 'game')}?${params.toString()}`
}

export async function readHtmlFile(file) {
  if (!file) return ''
  return file.text()
}

export function guessTitleFromFilename(filename = '') {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function gameFileName({ slug, originalName = 'game.html' }) {
  const safeName = originalName.toLowerCase().endsWith('.html') ? originalName : `${originalName}.html`
  return `${slug}/${Date.now()}-${safeName.replace(/[^a-z0-9._-]+/gi, '-')}`
}

export function humanFileSize(bytes = 0) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '—'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }
  return `${size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`
}

export function gameStatusLabel(status) {
  return status === 'draft' ? 'Borrador' : 'Publicado'
}

export function nowLabel(timestamp) {
  if (!timestamp) return '—'
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
