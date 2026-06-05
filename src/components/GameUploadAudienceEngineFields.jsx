import { GameUploadAudienceField } from './GameUploadAudienceField'
import { GameUploadEngineField } from './GameUploadEngineField'

export function GameUploadAudienceEngineFields({ form, setForm }) {
  return (
    <>
      <GameUploadAudienceField form={form} setForm={setForm} />
      <GameUploadEngineField form={form} setForm={setForm} />
    </>
  )
}
