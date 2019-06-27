
const user = {
  id: '0',
  name: 'jurgen klopp',
  email: 'jurgen@oraleye.com',
  dietary_requirements: '1,2,3,4'
}
const user1 = {
  id: '1',
  name: 'roberto firmino',
  email: 'bobby@oraleye.com',
  dietary_requirements: '5,6'
}
const user2 = {
  id: '2',
  name: 'steven gerrard',
  email: 'gerrard@oraleye.com',
  dietary_requirements: ''
}
const entry = {
  id: '0',
  date: new Date(),
  dietary_requirements: ['fish', 'eggs'],
  name: 'Entry 1',
  chef: 2

}
const entry1 = {
  id: '1',
  date: new Date(),
  dietary_requirements: ['nuts', 'soybean'],
  name: 'Entry 2',
  chef: 1
}

const vote = {
  id: '0',
  entry_id: 0,
  complexity: 5,
  taste: 8,
  quantity: 2,
  user_id: 0
}

const vote1 = {
  id: '1',
  entry_id: 0,
  complexity: 3,
  taste: 2,
  quantity: 5,
  user_id: 1
}

const vote2 = {
  id: '2',
  entry_id: 1,
  complexity: 8,
  taste: 8,
  quantity: 4,
  user_id: 0
}

const mocks = (name, obj) => ({
  signup: Object.assign({
    email: 'jurgen@oraleye.com'
  }, obj),
  login: ({ ...user, authToken: 'abc123' }),
  patchUser: Object.assign({}, user, obj),
  fetchUser: Object.assign({}, user, obj),
  fetchUsers: [user, user1, user2],
  fetchDiet: ['nuts', 'luts', 'tuts'].map((a, i) => ({ name: a, i })),
  competitions: [{ name: 'iScream', active: true, startDate: new Date(2019, 6, 18), day: 3, hour: 13, minute: 30 }],
  getEntry: Object.assign({}, entry, obj),
  getEntries: [entry, entry1],
  updateEntry: Object.assign({}, entry, obj),
  createEntry: Object.assign({}, entry, obj),
  listAllergens: [{ value: 0, name: 'Nuts' }, { value: 1, name: 'Fish' }],
  getVotes: [vote, vote1, vote2].map(value => Object.assign({}, value, obj))
}[name])

export default mocks
