import _ from 'lodash'
import { useEffect, useState } from 'react'
import { fetchUsers, getEntries, getVotes, fetchDietaryRequirements, fetchUser, getAllVotes } from 'services/API/index'
import { getUserId } from 'utils/localstorage'

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
    console.log(paused)
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
export const useAllVotesList = ({ sortBy = 'name', paused = true }) => {
  return useAPIRefresh({ dataFn: getAllVotes, sortBy, paused })
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
  const [votes] = useAllVotesList({})
  const ret = entries.map(ent => {
    ent.user = _.find(users, user => user.id === ent.chef)
    ent.votes = _.filter(votes, (v) => v.competition_entry_id === ent.id)
    return ent
  })
  return [ret]
  // return useAPIRefresh({ dataFn: getEntries, sortBy, paused })
}

export const useDRs = ({ sortBy = 'name', paused = true }) => {
  const [drs] = useAPIRefresh({ dataFn: fetchDietaryRequirements, paused })
  return [drs]
}

export const useCurrentUser = (id) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser(id || getUserId()).then((user) => {
      setUser(user)
    })
  }, [id])

  return user
}
