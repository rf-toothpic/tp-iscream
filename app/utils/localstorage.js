const TOKEN = 'is-token'

export function setToken (token) {
  window.localStorage.setItem(TOKEN, token)
}
export function getToken () {
  return window.localStorage.getItem(TOKEN)
}

export function clearData () {

}

export function clearToken () {
  window.localStorage.removeItem(TOKEN)
}

export const isAuthenticated = () => {
  const token = window.localStorage.getItem(TOKEN)
  return undefined !== token && token !== null
}
