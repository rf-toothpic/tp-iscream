/**
 *
 * ActiveListItem
 *
 */

import ListItem from '@material-ui/core/ListItem'
import React from 'react'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ActiveListItem ({ location, to, children }) {
  const active = to === location.pathname
  return <ListItem button active={active} children={children} />
}

ActiveListItem.propTypes = {}

export default withRouter(ActiveListItem)
