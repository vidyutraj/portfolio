import { useState } from 'react'

const API_URL = 'https://8j6p9789pl.execute-api.us-east-1.amazonaws.com/default/FirstLambdaFunction'

export default function NameForm() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      setResult(data?.message ?? 'Success')
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="field">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          className="input"
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Submitting…' : 'Submit'}
        </button>
      </form>
      {result && <div className="notice success" style={{ marginTop: 10 }}>{result}</div>}
      {error && <div className="notice error" style={{ marginTop: 10 }}>{error}</div>}
    </div>
  )
}

