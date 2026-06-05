import { GameUploadTextField } from './GameUploadTextField'

export function GameUploadEngineField({ form, setForm }) {
  return (
    <GameUploadTextField
      label="Motor / tecnología"
      value={form.engine}
      onChange={(event) => setForm((current) => ({ ...current, engine: event.target.value }))}
      placeholder="HTML + JS + Phaser"
    />
  )
}
