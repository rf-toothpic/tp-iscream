import { userLoginRequestSuccess, userUpdateUserRequestSuccess } from 'containers/Auth/actions'
import { clearToken, getToken, setToken } from 'utils/localstorage'
import request from 'utils/request'
import { delay, put } from 'redux-saga/effects'
import mocks from './mocks'
import { create } from 'apisauce'
import { entryList, entryGet } from './transforms'
const GET = 'GET'
const POST = 'POST'
const FETCH = 'GET'

const headers = { 'content-type': 'application/json' }
const token = getToken()
if (token && token !== 'undefined') {
  headers['x-auth-token'] = getToken()
} else {
  clearToken()
}
const api = create({
  baseURL: process.env.BASE_URL,
  headers: headers,
  mode: 'cors'
  // transformRequest: data => {data.mode = 'cors'; return data}

  // transformResponse: res => {
  //   const data = JSON.parse(res)
  //   return JSON.parse(data.data ? data.data : data)
  // }
})

api.addResponseTransform(response => {
  if (response.data) {
    if (response.data.data) {
      response.data = response.data.data
    }
  }
  if (response.status === 200) {
    if (response.data.errors) {
      throw new Error(response.data.errors)
    }
  }
  if (response.status === 401) {
    window.location.href = '/login'
  }
  if (response.status > 400) {
    throw new Error(response.data.error)
  }

  if (!response.ok) {
    throw new Error('error')
  }
  return response
})

async function mock (name) {
  await delay(1000)
  return mocks(name)
}

export async function signUpUser (user) {
  return api.post('/users', user)
    .then(res => {
      api.setHeader('x-auth-token', res.data.auth_token)
      return res.data
    })
}

export async function loginUser (email, password) {
  try {
    return api.post('auth/login', { email, password })
      .then((res) => {
        api.setHeader('x-auth-token', res.data.auth_token)
        if (!res.ok) {
          throw new Error('unauthorized')
        }
      })
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function updateUser () {
  return mock('patchUser')
}

export async function fetchUser (id) {
  return api.get(`/users/${id}`)
}

export async function fetchUsers () {
  return api.get('/users')
    .then(users => users.data)
}

// export async function fetchCompetitions () {
//   return mock('competitions')
// }

export async function fetchDietaryRequirements () {
  return api.get('/dietary_requirements')
    .then(dr => dr.data || [])
}

export async function getEntry (id) {
  return api.get(`/competition_entries/${id}`)
    .then(entry => entryGet(entry.data))
}

export async function getEntryVotes (id) {
  return api.get(`/competition_entries/${id}/votes`)
    .then(entry => entry.data)
}

export async function getEntries () {
  return api.get('/competition_entries')
    .then(entries => entryList(entries.data))
}

export async function updateEntry (obj) {
  return mock('updateEntry', obj)
}

export async function createEntry (obj) {
  return mock('createEntry', obj)
}

export async function getVotes ({ id }) {
  return mock('getVotes', { entry_id: id })
}
