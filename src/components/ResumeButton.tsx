import { useState } from 'react'

const API_URL = 'https://8j6p9789pl.execute-api.us-east-1.amazonaws.com/default/FirstLambdaFunction'

export default function ResumeButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/resume`)
      const data = await res.json()
      if (data?.resumeUrl) {
        window.open(data.resumeUrl, '_blank')
      } else {
        throw new Error(data?.error || 'Failed to get URL')
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
      <button onClick={handleClick} disabled={loading} className="btn btn-primary">
        {loading ? 'Generating URL…' : 'Get Presigned URL for Resume'}
      </button>
      {error && <p className="notice error" style={{ margin: 0 }}>{error}</p>}
    </div>
  )
}

