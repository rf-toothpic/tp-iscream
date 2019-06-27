/**
 *
 * Vote
 *
 */

import Ballot from 'components/Ballot'
import { createEntry, getEntry } from 'containers/Entry/actions'
import { createVote } from 'containers/Vote/actions'
import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { useCurrentUser } from 'services/API/hooks'
import { Redirect } from 'react-router-dom'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import makeSelectVote, { selectEntry, selectSubmitted } from './selectors'
import reducer from './reducer'
import saga from './saga'

export function Vote ({ entry, getEntry, match, castVote, submitted }) {
  useInjectReducer({ key: 'vote', reducer })
  useInjectSaga({ key: 'vote', saga })

  const user = useCurrentUser()
  if (!match.params.id) {
    return <Redirect to='/leaderboard?view=table' />
  }
  useEffect(() => {
    getEntry(match.params.id)
  }, [])

  const onSubmit = (data) => {
    castVote(data)
  }

  if (user && entry && user.id === entry.id) {
    return <div>
      <h1>I CALL SHENANIGANS</h1>
    </div>
  }

  if (submitted) {
    return <h1>And so it is done</h1>
  }

  return (
    <div>
      <Helmet>
        <title>Vote</title>
        <meta name='description' content='Description of Vote' />
      </Helmet>

      {!entry && '...loading'}
      {entry && <Ballot submit={onSubmit} entry={entry} />}

    </div>
  )
}

Vote.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  vote: makeSelectVote(),
  entry: selectEntry(),
  submitted: selectSubmitted()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    getEntry: (id) => dispatch(getEntry(id)),
    castVote: (id) => dispatch(createVote(id))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  memo
)(Vote)
