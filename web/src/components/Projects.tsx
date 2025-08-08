type Project = {
  title: string
  description: string
  tech: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: 'Serverless Certs API',
    description: 'AWS Lambda + API Gateway endpoint serving certifications JSON with presigned S3 resume links.',
    tech: ['AWS Lambda', 'API Gateway', 'S3', 'Node.js'],
  },
  {
    title: 'Portfolio Frontend',
    description: 'Vite + React + TypeScript single-page portfolio with custom CSS design system.',
    tech: ['React', 'Vite', 'TypeScript', 'CSS'],
  },
  {
    title: 'Data Pipeline POC',
    description: 'ETL pipeline to ingest analytics into a warehouse with scheduled transformations.',
    tech: ['Python', 'Airflow', 'BigQuery'],
  },
]

export default function Projects() {
  return (
    <div className="grid grid-2">
      {projects.map((p) => (
        <article key={p.title} className="card">
          <h3>{p.title}</h3>
          <p style={{ marginTop: 6 }}>{p.description}</p>
          <div className="tags">
            {p.tech.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          {p.link && (
            <div style={{ marginTop: 12 }}>
              <a className="btn btn-outline" href={p.link} target="_blank" rel="noreferrer">Visit</a>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

