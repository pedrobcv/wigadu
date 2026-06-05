export function GameCardDescription({ game }) {
  return <p>{game.description || 'Sin descripción todavía.'}</p>
}
