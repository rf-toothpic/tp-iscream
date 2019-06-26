/**
 *
 * Allergens
 *
 */

import AllergensList from 'components/AllergensList'
import { fetchAllergens } from 'containers/Allergens/actions'
import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { selectAllergens } from './selectors'
import reducer from './reducer'
import saga from './saga'

export function Allergens ({ allergens, getAllergens, selected = [], ...props }) {
  useInjectReducer({ key: 'allergens', reducer })
  useInjectSaga({ key: 'allergens', saga })

  useEffect(() => {
    getAllergens()
  }, [])

  return <AllergensList list={allergens} value={selected} {...props}/>
}

Allergens.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  allergens: selectAllergens()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    getAllergens: () => dispatch(fetchAllergens())
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  memo
)(Allergens)
