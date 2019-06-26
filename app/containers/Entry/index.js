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

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { selectEntry } from './selectors'
import reducer from './reducer'
import saga from './saga'
import { createEntry, updateEntry, getEntry } from './actions'

export function Entry ({ onSubmit, getEntry, match, entry }) {
  useInjectReducer({ key: 'entry', reducer })
  useInjectSaga({ key: 'entry', saga })

  useEffect(() => {
    getEntry(match.params.id)
  }, [match.params.id])

  const [editable, setEditable] = useState(!match.params.id)
  const [id] = useState(match.params ? match.params.id || null : null)

  if (entry.id && !match.params.id) {
    return <Redirect to={/entry/`${id}`} />
  }

  return (
    <div>
      <Helmet>
        <title>Entry</title>
        <meta name='description' content='New Entry' />
      </Helmet>
      {!editable && <Button onClick={() => setEditable(!editable)}>Edit</Button>}
      <CreateEntryForm entry={entry} editable={editable || !match.params.id} onSubmit={onSubmit} />
    </div>
  )
}

Entry.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  entry: selectEntry(),
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    onSubmit: (data) => dispatch(data.id ? updateEntry(data) : createEntry(data)),
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
