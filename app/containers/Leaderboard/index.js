/**
 *
 * Leaderboard
 *
 */

import Button from 'components/Button'
import EntriesChart from 'components/EntriesChart'
import EntriesTable from 'components/EntriesTable'
import { selectUsers } from 'containers/Auth/selectors'
import { useEntriesList, useEntriesWithUsersList, useUsersList } from 'services/API/hooks'
import { selectLeaderboardEntries, selectLeaderboardUsers } from './selectors'
import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import reducer from './reducer'
import saga from './saga'

import { fetchEntries } from 'containers/Entry/actions'

import { fetchUsers } from 'containers/Auth/actions'

import qs from 'query-string'

export function Leaderboard ( ) {
  // useInjectReducer({ key: 'leaderboard', reducer })
  // useInjectSaga({ key: 'leaderboard', saga })

  const param = qs.parse(window.location.search).type
  const [type, setType] = useState(param)
  if (!type || type !== param) {
    return <Redirect to={`/leaderboard?type=${type || 'table'}`} />
  }

  const toggleType = (e) => {
    e.preventDefault()
    const t = type === 'chart' ? 'table' : 'chart'
    setType(t)
  }

  const [entries] = useEntriesWithUsersList({})

  return (
    <div>
      <Helmet>
        <title>Leaderboard</title>
        <meta name='description' content='Description of Leaderboard' />
      </Helmet>
      <Button onClick={toggleType}>Toggle</Button>
      {type === 'chart' ? <EntriesChart entries={entries} /> : <EntriesTable entries={entries} />}
    </div>
  )
}

Leaderboard.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// const mapStateToProps = createStructuredSelector({
//   entries: selectLeaderboardEntries(),
//   users: selectUsers()
// })

// function mapDispatchToProps (dispatch) {
//   return {
//     dispatch,
//     getUsers: () => dispatch(fetchUsers()),
//     getEntries: () => dispatch(fetchEntries())
//   }
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )

export default compose(
  // withConnect,
  memo
)(Leaderboard)
