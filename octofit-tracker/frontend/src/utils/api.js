export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName && codespaceName !== 'localhost') {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export function getApiUrl(path) {
  const baseUrl = getApiBaseUrl()
  return new URL(path, `${baseUrl}/`).toString()
  // return path.startsWith('/') ? path : `/${path}`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }

    if (payload.data && typeof payload.data === 'object') {
      return [payload.data]
    }
  }

  return []
}
