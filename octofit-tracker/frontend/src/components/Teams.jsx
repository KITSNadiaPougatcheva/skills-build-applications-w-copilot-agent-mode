import { useEffect, useState } from 'react'
import { getApiBaseUrl, getApiUrl, normalizeCollectionResponse } from '../utils/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        // /api/teams/
        // -8000.app.github.dev/api/teams/
        const response = await fetch(getApiUrl('/api/teams/'))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setTeams(normalizeCollectionResponse(payload))
      } catch (err) {
        setError(err.message || 'Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Competitive groups and team rosters.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6 col-xl-4" key={team._id || team.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{team.name}</h3>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-1"><strong>Description:</strong> {team.description}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members?.length || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
