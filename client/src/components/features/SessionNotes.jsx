import React from 'react'
import { useSession } from '../../contexts/SessionContext.jsx'

export function SessionNotes() {
  const { sessionNotes, setSessionNotes } = useSession()

  return (
    <div className="session-notes">
      <textarea
        className="notes-textarea"
        value={sessionNotes}
        onChange={(e) => setSessionNotes(e.target.value)}
        placeholder="Capture key insights, pain points, and important details from your conversation...

Tips:
- Note specific pain points mentioned
- Record budget and timeline indicators
- Track decision makers identified
- List technical requirements discovered"
      />
    </div>
  )
}
