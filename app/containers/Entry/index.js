/**
 *
 * Entry
 *
 */

import Button from 'components/Button'
import CreateEntryForm from 'components/CreateEntryForm'
import React, { memo, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { useCurrentUser, useDRs } from 'services/API/hooks'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { selectEntry } from './selectors'
import reducer from './reducer'
import saga from './saga'
import { createEntry, updateEntry, getEntry } from './actions'

export function Entry ({ onSubmit, getEntry, match, entry }) {
  useInjectReducer({ key: 'entry', reducer })
  useInjectSaga({ key: 'entry', saga })

  const user = useCurrentUser()

  useEffect(() => {
    if (match.params.id) {
      getEntry(match.params.id)
    }
  }, [match.params.id])

  const [editable, setEditable] = useState(!match.params.id)

  if (entry && entry.id && !match.params.id) {
    console.log('asd')
    return <Redirect to={`/entry/${entry.id}`} />
  }

  if (entry && entry.user_id && user && entry.user_id !== user.id) {
    console.log('asd1')
    return <Redirect to={{ pathname: `/vote/${entry.id}` }} />
  }

  const [requirements] = useDRs({})

  const createEntry = (data) => {
    onSubmit(data)
  }

  const patchEntry = (data) => {
    console.log(data)
    onSubmit(data)
  }
  console.log('asd123')

  return (
    <div>
      <Helmet>
        <title>Entry</title>
        <meta name='description' content='New Entry' />
      </Helmet>
      {!editable && <Button onClick={() => setEditable(!editable)}>Edit</Button>}
      {!match.params.id && <CreateEntryForm drList={requirements} entry={null} onSubmit={createEntry} />}
      {match.params.id && <CreateEntryForm drList={requirements} entry={entry} onSubmit={patchEntry} />}
    </div>
  )
}

Entry.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  entry: selectEntry()
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
