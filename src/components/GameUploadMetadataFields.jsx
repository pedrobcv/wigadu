import { GameUploadAudienceEngineFields } from './GameUploadAudienceEngineFields'
import { GameUploadTextField } from './GameUploadTextField'

export function GameUploadMetadataFields({ form, setForm }) {
  return (
    <div className="studio-field-grid">
      <GameUploadTextField
        label="Título del juego"
        value={form.title}
        onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
        placeholder="Aventura Matemática"
      />
      <GameUploadTextField
        label="Slug / enlace interno"
        value={form.slug}
        onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
        placeholder="aventura-matematica"
      />
      <GameUploadAudienceEngineFields form={form} setForm={setForm} />
    </div>
  )
}
