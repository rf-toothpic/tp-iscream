/**
 *
 * ButtonLink
 *
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ButtonLink ({ to, ...props }) {
  return <Link to={to}><Button {...props} /></Link>
}

ButtonLink.propTypes = {}

export default ButtonLink
