import { useEffect, useState } from 'react'
import { getApiBaseUrl, getApiUrl, normalizeCollectionResponse } from '../utils/api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        // /api/leaderboard/
        const response = await fetch(getApiUrl('/api/leaderboard/'))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setEntries(normalizeCollectionResponse(payload))
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Top performers and streaks.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.rank}>
                  <td>#{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                  <td>{entry.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
