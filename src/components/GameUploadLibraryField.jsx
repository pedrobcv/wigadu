import { GameUploadTextField } from './GameUploadTextField'

export function GameUploadLibraryField({ form, setForm }) {
  return (
    <GameUploadTextField
      label="Librerías / stack"
      value={form.library}
      onChange={(event) => setForm((current) => ({ ...current, library: event.target.value }))}
      placeholder="Vanilla / PixiJS / Phaser / anime.js"
    />
  )
}
