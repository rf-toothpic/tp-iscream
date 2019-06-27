/**
 *
 * Entry
 *
 */

import Button from 'components/Button'
import CreateEntryForm from 'components/CreateEntryForm'
import VotesTable from 'components/VotesTable'
import React, { memo, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { useCurrentUser, useDRs, useVotesList } from 'services/API/hooks'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { getUserId } from 'utils/localstorage'
import { selectEntry, selectLoading } from './selectors'
import reducer from './reducer'
import saga from './saga'
import { createEntry, updateEntry, getEntry } from './actions'

export function Entry ({ onSubmit, getEntry, match, entry, loading }) {
  useInjectReducer({ key: 'entry', reducer })
  useInjectSaga({ key: 'entry', saga })

  useEffect(() => {
    if (match.params.id) {
      getEntry(match.params.id)
    }
  }, [match.params.id])

  if (loading) {
    return '...loading'
  }

  const [hasVoted, setHasVoted] = useState(null)
  const [isOwnEntry, setOwnEntry] = useState(null)
  const user = useCurrentUser()
  let votes
  if (match.params.id) {
    [votes] = useVotesList(match.params.id, {})
  }

  if (user && entry && isOwnEntry !== null) {
    if (user.id === entry.user_id) {
      setOwnEntry(true)
    } else {
      setOwnEntry(false)
    }
  }

  if (votes && hasVoted === null) {
    if (_.find(votes, vote => vote && vote.user_id === getUserId())) {
      setHasVoted(true)
    } else {
      setHasVoted(false)
    }
  }

  const [editable, setEditable] = useState(!match.params.id)

  if (entry && entry.id && !match.params.id) {
    console.log('asd')
    return <Redirect to={`/entry/${entry.id}`} />
  }

  if (!entry) {
    return '...loading'
  }
  //
  // if (entry && entry.user_id && user && entry.user_id !== user.id) {
  //   console.log('asd1')
  //   return <Redirect to={{ pathname: `/vote/${entry.id}` }} />
  // }

  const [requirements] = useDRs({})

  const createEntry = (data) => {
    onSubmit(data)
  }

  const patchEntry = (data) => {
    console.log(data)
    onSubmit(data)
  }
  return (
    <div>
      <Helmet>
        <title>Entry</title>
        <meta name='description' content='New Entry' />
      </Helmet>
      {!editable && <Button onClick={() => setEditable(!editable)}>Edit</Button>}
      {!isOwnEntry && !hasVoted && <Button component={Link} to={`/vote/${entry.id}`}>VOTE</Button>}
      {!match.params.id && <CreateEntryForm drList={requirements} entry={null} editable onSubmit={createEntry} />}
      {match.params.id && <CreateEntryForm drList={requirements} entry={entry} editable={isOwnEntry} onSubmit={patchEntry} />}
      {match.params.id && entry && entry.user_id === getUserId() && <VotesTable votes={votes} anonymous />}
    </div>
  )
}

Entry.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  entry: selectEntry(),
  loading: selectLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    onSubmit: (data) => {
      console.log(data, createEntry(data))
      dispatch(data.id ? updateEntry(data) : createEntry(data))
    },
    getEntry: (id) => dispatch(getEntry(id))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  memo
)(Entry)
