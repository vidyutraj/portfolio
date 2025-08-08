import { useEffect, useState } from 'react'

type Certification = {
  title: string
  issuer: string
  date: string
  url: string
}

const API_URL = 'https://8j6p9789pl.execute-api.us-east-1.amazonaws.com/default/FirstLambdaFunction'

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchCerts = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        const list: Certification[] = data?.certifications ?? []
        if (isMounted && list.length > 0) {
          setCertifications(list)
          return
        }
      } catch (e) {
        // fall through to local
      }
      try {
        const localRes = await fetch('/certifications.json')
        const localData = (await localRes.json()) as Certification[]
        if (isMounted) setCertifications(localData)
      } catch (e) {
        if (isMounted) setError('Failed to fetch certifications')
      }
    }
    fetchCerts()
    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  if (!certifications) {
    return (
      <div className="grid grid-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card" style={{height: 96, opacity: 0.6}} />
        ))}
      </div>
    )
  }

  if (certifications.length === 0) {
    return <div className="text-gray-500">No certifications found.</div>
  }

  return (
    <div className="grid grid-2">
      {certifications.map((cert) => (
        <a
          key={`${cert.title}-${cert.date}`}
          className="card cert-card"
          href={cert.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <h3>{cert.title}</h3>
          <p className="cert-meta"><strong>Issuer:</strong> {cert.issuer}</p>
          <p className="cert-meta"><strong>Date:</strong> {cert.date}</p>
        </a>
      ))}
    </div>
  )
}

