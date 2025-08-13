import React, { useEffect, useState } from 'react'
import { api, asMessage } from '../api/client'

export default function Notificaciones() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/notificaciones'); setItems(Array.isArray(data)?data:[]) }
      catch (err) { setError(asMessage(err)) }
    })()
  }, [])

  return (
    <div>
      <h1>Notificaciones</h1>
      {error && <div className="alert">{error}</div>}
      <pre className="mono">{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
