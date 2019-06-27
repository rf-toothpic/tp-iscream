/**
 *
 * Vote
 *
 */

import CardActions from '@material-ui/core/CardActions'
import { Type } from '@toothpic/components/es/Type'
import Ballot from 'components/Ballot'
import { createEntry, getEntry } from 'containers/Entry/actions'
import { createVote } from 'containers/Vote/actions'
import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Confetti from 'react-dom-confetti'
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

  useEffect(() => {
    getEntry(match.params.id)
    return () => {}
  }, [])

  const [confettiGo, setC] = React.useState(false)

  if (!match.params.id) {
    return <Redirect to='/leaderboard?view=table' />
  }
  const onSubmit = (data) => {
    castVote(data)
  }

  if (user && entry && user.id === entry.id) {
    return <div>
      <h1>I CALL SHENANIGANS</h1>
    </div>
  }

  if (submitted) {
    const config = {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 50,
      dragFriction: 0.1,
      duration: 5000,
      stagger: 0,
      width: '10px',
      height: '10px',
      colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
    }

    if (!confettiGo) {
      setTimeout(() => {
        setC(!confettiGo)
      }, 1000)
    }

    return <div>
      <Type name='h2/f/center/primary/semibold'>And so it is done</Type>
      <div style={{ margin: '0 auto', width: 1 }}><Confetti active={confettiGo} config={config} /></div>
    </div>
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
