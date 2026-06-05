import { GameUploadReadyNotice } from './GameUploadReadyNotice'

export function GameUploadAlerts({ message, error, ready }) {
  return (
    <>
      {message ? <p className="status success">{message}</p> : null}
      {error ? <p className="status error">{error}</p> : null}
      <GameUploadReadyNotice ready={ready} />
    </>
  )
}
