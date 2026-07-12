import { useEffect, useState } from 'react'
import { getApiBaseUrl, getApiUrl, normalizeCollectionResponse } from '../utils/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        // /api/activities/
        const response = await fetch(getApiUrl('/api/activities/'))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setActivities(normalizeCollectionResponse(payload))
      } catch (err) {
        setError(err.message || 'Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent workouts and movement logs.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6 col-xl-4" key={activity._id || activity.date}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{activity.type}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.duration} min</p>
                  <p className="mb-1"><strong>Calories:</strong> {activity.calories}</p>
                  <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm} km</p>
                  <p className="mb-0"><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities
