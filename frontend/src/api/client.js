import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089/api'

export const api = axios.create({
  baseURL,
  timeout: 20000
})

export function asMessage(err){
  if (err?.response?.data?.message) return err.response.data.message
  if (err?.response?.data?.error) return err.response.data.error
  if (err?.message) return err.message
  return String(err)
}
