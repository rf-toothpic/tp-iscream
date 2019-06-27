const TOKEN = 'is-token'
const USERId = 'is-user-id'

export function setToken (token) {
  window.localStorage.setItem(TOKEN, token)
}
export function getToken () {
  return window.localStorage.getItem(TOKEN)
}

export function setUserId (token) {
  window.localStorage.setItem(USERId, token)
}
export function getUserId () {
  return window.localStorage.getItem(USERId)
}

export function clearData () {

}

export function clearToken () {
  window.localStorage.removeItem(TOKEN)
  window.localStorage.removeItem(USERId)
}

export const isAuthenticated = () => {
  const token = window.localStorage.getItem(TOKEN)
  return undefined !== token && token !== null
}
