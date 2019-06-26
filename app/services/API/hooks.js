import { useEffect, useState } from 'react'
import { fetchUsers, getEntries, getVotes } from 'services/API/index'

const REFRESH_TIME = 10000

export const useAPIRefresh = ({ sortBy = 'name', paused = false, dataFn = async () => {}, params = {} }) => {
  const [data, setData] = useState([])
  const [count, updateCount] = useState(0)

  const fetchData = async function () {
    const d = await dataFn(params)
    setData(d)
  }

  const cancel = useEffect(() => {
    fetchData()
    if (!paused) {
      setTimeout(() => updateCount(count + 1), REFRESH_TIME)
    }
  }, [sortBy, count])

  return [data, cancel]
}

export const useUsersList = ({ sortBy = 'name', paused = true }) => {
  return useAPIRefresh({ dataFn: fetchUsers, sortBy, paused })
}

export const useEntriesList = ({ sortBy = 'name', paused = true }) => {
  return useAPIRefresh({ dataFn: getEntries, sortBy, paused })
}

export const useVotesList = (id, { sortBy = 'name', paused = true }) => {
  return useAPIRefresh({ dataFn: getVotes, params: { id }, sortBy, paused })
}
export const useEntriesWithUsersList = ({ sortBy = 'name', paused = true }) => {
  const [users] = useUsersList({})
  const [entries] = useEntriesList({})
  const ret = entries.map(ent => {
    ent.user = _.find(users, user => user.id === ent.chef)
    return ent
  })
  return [ret]
  // return useAPIRefresh({ dataFn: getEntries, sortBy, paused })
}

export const useEntriesWithUsersAndVotesList = ({ sortBy = 'name', paused = true }) => {
  const [users] = useUsersList({})
  const [entries] = useEntriesList({})
  const [votes] = useVotesList({ entryId: 0 })
  const ret = entries.map(ent => {
    ent.user = _.find(users, user => user.id === ent.chef)

    return ent
  })
  return [ret]
  // return useAPIRefresh({ dataFn: getEntries, sortBy, paused })
}
