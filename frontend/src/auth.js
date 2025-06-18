import axios from 'axios'

const API = 'http://localhost:3001/api'

export async function login(email, password) {
  const res = await axios.post(`${API}/login`, { email, password })
  localStorage.setItem('token', res.data.token)
}
export async function register(email, password) {
  await axios.post(`${API}/register`, { email, password })
}
export function logout() {
  localStorage.removeItem('token')
}
export function getToken() {
  return localStorage.getItem('token')
}
export function authHeaders() {
  return { Authorization: 'Bearer ' + getToken() }
}