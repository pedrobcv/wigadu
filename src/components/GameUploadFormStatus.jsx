import { GameUploadSubmitRow } from './GameUploadSubmitRow'
import { GameUploadAlerts } from './GameUploadAlerts'

export function GameUploadFormStatus({ busy, message, error, ready }) {
  return (
    <>
      <GameUploadSubmitRow busy={busy} />

      <GameUploadAlerts message={message} error={error} ready={ready} />
    </>
  )
}
