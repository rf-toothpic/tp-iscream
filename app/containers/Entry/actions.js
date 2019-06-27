/*
 *
 * Entry actions
 *
 */

import { DEFAULT_ACTION,
  CREATE_ENTRY, CREATE_ENTRY_SUCCESS, CREATE_ENTRY_FAILURE,
  UPDATE_ENTRY, UPDATE_ENTRY_SUCCESS, UPDATE_ENTRY_FAILURE,
  GET_ENTRY, GET_ENTRY_SUCCESS, GET_ENTRY_FAILURE,
  FETCH_ENTRIES, FETCH_ENTRIES_SUCCESS, FETCH_ENTRIES_FAILURE } from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}

export function createEntry (payload) {
  return {
    type: CREATE_ENTRY,
    payload
  }
}
export function createEntrySuccess (payload) {
  return {
    type: CREATE_ENTRY_SUCCESS,
    payload
  }
}
export function createEntryFailure (payload) {
  return {
    type: CREATE_ENTRY_FAILURE,
    payload
  }
}

export function getEntry (id) {
  return {
    type: GET_ENTRY,
    payload: { id }
  }
}
export function getEntrySuccess (payload) {
  return {
    type: GET_ENTRY_SUCCESS,
    payload
  }
}
export function getEntryFailure (error) {
  return {
    type: GET_ENTRY_FAILURE,
    error
  }
}
export function fetchEntries () {
  return {
    type: FETCH_ENTRIES,
    payload: { id }
  }
}
export function getEntriesSuccess (payload) {
  return {
    type: FETCH_ENTRIES_SUCCESS,
    payload
  }
}
export function getEntriesFailure (error) {
  return {
    type: FETCH_ENTRIES_FAILURE,
    error
  }
}
export function updateEntry (payload) {
  return {
    type: UPDATE_ENTRY,
    payload
  }
}
export function updateEntrySuccess (payload) {
  return {
    type: UPDATE_ENTRY_SUCCESS,
    payload
  }
}
export function updateEntryFailure (error) {
  return {
    type: UPDATE_ENTRY_FAILURE,
    error
  }
}
