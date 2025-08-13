export function coerce(value){
  if (value === '' || value === null || value === undefined) return value
  if (value === 'true') return true
  if (value === 'false') return false
  if (!isNaN(value) && String(value).trim() !== '') return Number(value)
  const d = Date.parse(value)
  if (!isNaN(d) && /[-:T]/.test(value)) return new Date(d).toISOString()
  return value
}
