import { GameUploadFileInputField } from './GameUploadFileInputField'

export function GameUploadFileField({ setHtmlFile }) {
  return (
    <GameUploadFileInputField
      label="Archivo HTML"
      accept=".html,text/html"
      onChange={(event) => setHtmlFile(event.target.files?.[0] ?? null)}
    />
  )
}
