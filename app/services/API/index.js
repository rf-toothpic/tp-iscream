import { userLoginRequestSuccess, userUpdateUserRequestSuccess } from 'containers/Auth/actions'
import { getToken, setToken } from 'utils/localstorage'
import request from 'utils/request'
import { delay, put } from 'redux-saga/effects'
import mocks from './mocks'
import { create } from 'apisauce'
import { entryList } from './transforms'
const GET = 'GET'
const POST = 'POST'
const FETCH = 'GET'

const api = create({
  baseURL: process.env.BASE_URL,
  headers: { 'x-auth-token': getToken(), 'content-type': 'application/json' }
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
})

async function mock (name) {
  await delay(1000)
  return mocks(name)
}

export async function signUpUser () {
  return mock('signup')
}

export async function loginUser (email, password) {
  return api.post('auth/login', { email, password })
    .then((res) => {
      api.setHeader('x-auth-token', res.auth_token)
      return res
    })
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

export async function fetchCompetitions () {
  return mock('competitions')
}

export async function fetchDietaryRequirements () {
  const data = mock('fetchDiet')
}

export async function getEntry (id) {
  return mock('getEntry', { id })
}
export async function getEntries () {
  return mock('getEntries')
    .then(entries => entryList(entries))
}
export async function updateEntry (obj) {
  return mock('updateEntry', obj)
}
export async function createEntry (obj) {
  return mock('createEntry', obj)
}
export async function listAllergens (obj) {
  return mock('listAllergens', obj)
}
export async function getVotes ({ id }) {
  return mock('getVotes', { entry_id: id })
}
