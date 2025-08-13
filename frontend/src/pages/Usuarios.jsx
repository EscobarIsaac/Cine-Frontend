import React, { useEffect, useMemo, useState } from 'react'
import { api, asMessage } from '../api/client'
import { coerce } from '../helpers'

export default function Usuarios() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [jsonMode, setJsonMode] = useState(false)
  const [jsonBody, setJsonBody] = useState('{\n  \n}')
  const [form, setForm] = useState({})

  async function load(){
    setError('')
    try { const { data } = await api.get('/usuarios'); setItems(Array.isArray(data)?data:[]) }
    catch(err){ setError(asMessage(err)) }
  }
  useEffect(()=>{ load() }, [])

  const fields = useMemo(()=>{
    if(items.length===0) return []
    return Object.keys(items[0] || {}).filter(k => k.toLowerCase() !== 'id')
  }, [items])

  function onChange(k, v){ setForm(s => ({...s, [k]: v})) }

  async function crear(e){
    e.preventDefault(); setError('')
    try{
      let payload
      if(jsonMode){
        payload = JSON.parse(jsonBody || '{}')
      }else{
        payload = {}
        for(const k of fields){ if(form[k]!==undefined && form[k] !== '') payload[k]=coerce(form[k]) }
      }
      const { data } = await api.post('/usuarios', payload)
      setItems(v => [data, ...v]); setForm({}); setJsonBody('{\n  \n}')
    }catch(err){ setError(asMessage(err)) }
  }

  return (
    <div>
      <h1>Usuarios <span className="badge">{items.length}</span></h1>
      {error && <div className="alert">{error}</div>}

      <div className="card">
        <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
          <h3>Crear</h3>
          <label className="row" style={{gap:8, alignItems:'center'}}>
            <input type="checkbox" checked={jsonMode} onChange={e=>setJsonMode(e.target.checked)} /> Modo JSON
          </label>
        </div>

        {jsonMode ? (
          <form onSubmit={crear}>
            <label>JSON
              <textarea value={jsonBody} onChange={e=>setJsonBody(e.target.value)} className="mono" />
            </label>
            <div className="row" style={{marginTop:10}}>
              <button type="submit">Crear</button>
              <button type="button" className="secondary" onClick={()=>setJsonBody('{\n  \n}')}>Limpiar</button>
            </div>
          </form>
        ) : (
          <form onSubmit={crear}>
            <div className="grid2" style={{marginBottom:8}}>
              {fields.map(k => (
                <label key={k} style={{width:'100%'}}>
                  {k}
                  <input value={form[k] ?? ''} onChange={e=>onChange(k, e.target.value)} placeholder={k} />
                </label>
              ))}
            </div>
            {fields.length===0 && <div className="small">No hay datos para inferir campos. Activa "Modo JSON".</div>}
            <div className="row" style={{marginTop:10}}>
              <button type="submit">Crear</button>
              <button type="button" className="secondary" onClick={()=>setForm({})}>Limpiar</button>
            </div>
          </form>
        )}
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3>Listado</h3>
        <pre className="mono">{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  )
}
