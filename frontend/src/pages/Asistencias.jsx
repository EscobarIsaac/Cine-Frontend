import React, { useEffect, useState } from 'react'
import { api, asMessage } from '../api/client'

export default function Asistencias(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({ usuarioId:'', eventoId:'', puerta:'' })
  const [editId, setEditId] = useState('')
  const [editPuerta, setEditPuerta] = useState('')

  async function load(){
    setLoading(true); setError('')
    try {
      const { data } = await api.get('/asistencias')
      setItems(data)
    } catch(err){
      setError(asMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  async function crear(e){
    e.preventDefault()
    setError('')
    try {
      const payload = {
        usuarioId: form.usuarioId ? Number(form.usuarioId) : null,
        eventoId: form.eventoId ? Number(form.eventoId) : null,
        puerta: form.puerta || null
      }
      const { data } = await api.post('/asistencias', payload)
      setForm({ usuarioId:'', eventoId:'', puerta:'' })
      setItems(v => [data, ...v])
    } catch(err){
      setError(asMessage(err))
    }
  }

  async function actualizar(e){
    e.preventDefault()
    if(!editId) return
    setError('')
    try {
      const { data } = await api.put(`/asistencias/${editId}`, { puerta: editPuerta })
      setItems(v => v.map(it => it.id === data.id ? data : it))
      setEditId(''); setEditPuerta('')
    } catch(err){
      setError(asMessage(err))
    }
  }

  async function eliminar(id){
    if(!confirm('¿Eliminar asistencia ' + id + '?')) return;
    setError('')
    try {
      await api.delete(`/asistencias/${id}`)
      setItems(v => v.filter(it => it.id !== id))
    } catch(err){
      setError(asMessage(err))
    }
  }

  return (
    <div>
      <h1 style={{marginBottom:8}}>Asistencias</h1>
      <p style={{opacity:.75, marginTop:0}}>Base URL: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089/api'}</p>

      {error && <div style={{background:'#fee', border:'1px solid #f99', padding:10, borderRadius:8, margin:'8px 0'}}>{error}</div>}
      {loading && <div>Cargando…</div>}

      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:12, marginBottom:16}}>
        <form onSubmit={crear} style={{border:'1px solid #eee', padding:12, borderRadius:8}}>
          <h3>Crear</h3>
          <div style={{display:'grid', gap:8}}>
            <label>Usuario ID
              <input value={form.usuarioId} onChange={e=>setForm({...form, usuarioId:e.target.value})} placeholder="ej: 1" />
            </label>
            <label>Evento ID
              <input value={form.eventoId} onChange={e=>setForm({...form, eventoId:e.target.value})} placeholder="ej: 2" />
            </label>
            <label>Puerta
              <input value={form.puerta} onChange={e=>setForm({...form, puerta:e.target.value})} placeholder="A-1" />
            </label>
            <button type="submit">Crear</button>
          </div>
        </form>

        <form onSubmit={actualizar} style={{border:'1px solid #eee', padding:12, borderRadius:8}}>
          <h3>Actualizar puerta</h3>
          <div style={{display:'grid', gap:8}}>
            <label>ID
              <input value={editId} onChange={e=>setEditId(e.target.value)} placeholder="ej: 1" />
            </label>
            <label>Nueva puerta
              <input value={editPuerta} onChange={e=>setEditPuerta(e.target.value)} placeholder="B-3" />
            </label>
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </section>

      <table width="100%" cellPadding="8" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#5c50c7ff'}}>
            <th align="left">ID</th>
            <th align="left">Usuario</th>
            <th align="left">Evento</th>
            <th align="left">Puerta</th>
            <th align="left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id} style={{borderTop:'1px solid #eee'}}>
              <td>{it.id}</td>
              <td>{it.usuarioId}</td>
              <td>{it.eventoId}</td>
              <td>{it.puerta || '-'}</td>
              <td>
                <button onClick={()=> eliminar(it.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
