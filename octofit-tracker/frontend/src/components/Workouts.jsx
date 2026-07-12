import { useEffect, useState } from 'react'
import { getApiBaseUrl, getApiUrl, normalizeCollectionResponse } from '../utils/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        // /api/workouts/
        // -8000.app.github.dev/api/workouts/
        const response = await fetch(getApiUrl('/api/workouts/'))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeCollectionResponse(payload))
      } catch (err) {
        setError(err.message || 'Unable to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Suggested sessions and training plans.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6 col-xl-4" key={workout._id || workout.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{workout.title}</h3>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                  <p className="mb-0"><strong>Equipment:</strong> {workout.equipment?.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
