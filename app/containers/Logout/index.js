/**
 *
 * Logout
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { clearToken } from 'utils/localstorage'
import { Redirect } from 'react-router-dom'

export function Logout () {
  clearToken()
  return <Redirect to='/login' />
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(
  null,
  mapDispatchToProps
)

export default compose(withConnect)(Logout)
