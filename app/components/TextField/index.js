/**
 *
 * TextField
 *
 */

import React from 'react'
import TextField from '@material-ui/core/TextField'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TField (props) {
  return <TextField {...props} InputProps={{ disableUnderline: true }} />
}

TField.propTypes = {}

export default TField
