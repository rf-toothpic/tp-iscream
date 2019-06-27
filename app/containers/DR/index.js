/**
 *
 * DR
 *
 */

import DRList from 'components/DRList'
import { fetchDRs } from 'containers/DR/actions'
import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { useDRs } from 'services/API/hooks'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
// import { selectDRs } from './selectors'
import reducer from './reducer'
import saga from './saga'

export function DR ({ selected = [], ...props }) {
  useInjectReducer({ key: 'dietary_requirements', reducer })
  useInjectSaga({ key: 'dietary_requirements', saga })

  const [requirements] = useDRs({})

  return <DRList list={requirements} selected={selected} {...props} />
}

DR.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// const mapStateToProps = createStructuredSelector({
//   allergens: selectDRs()
// })
//
// function mapDispatchToProps (dispatch) {
//   return {
//     dispatch,
//   }
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )

export default compose(
  // withConnect,
  memo
)(DR)
