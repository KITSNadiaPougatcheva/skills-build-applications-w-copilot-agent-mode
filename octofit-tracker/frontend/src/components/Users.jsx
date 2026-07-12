import { useEffect, useState } from 'react'
import { getApiBaseUrl, getApiUrl, normalizeCollectionResponse } from '../utils/api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        // /api/users/
        const response = await fetch(getApiUrl('/api/users/'))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeCollectionResponse(payload))
      } catch (err) {
        setError(err.message || 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Athletes and account owners.</p>
        </div>
        <span className="badge bg-primary-subtle text-primary">{getApiBaseUrl()}</span>
      </div>

      {loading && <p className="text-muted">Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6 col-xl-4" key={user._id || user.email}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6">{user.name}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-1"><strong>Role:</strong> {user.role}</p>
                  <p className="mb-1"><strong>Goal:</strong> {user.fitnessGoal}</p>
                  <p className="mb-0"><strong>City:</strong> {user.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
