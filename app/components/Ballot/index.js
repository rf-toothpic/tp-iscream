/**
 *
 * Ballot
 *
 */

import Slider, { Range } from 'rc-slider'
import {Button} from '@material-ui/core'
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css'
import React from 'react'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const categories = [
  {
    name: 'taste'
  },
  {
    name: 'complexity'
  },
  {
    name: 'quantity'
  }
]
const DEFAULT_VALUE = 5

function Ballot () {
  const [values, setValues] = React.useState(categories.reduce((memo, cat) => Object.assign(memo, { [cat.name]: DEFAULT_VALUE })))
  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  return <form>
    <fieldset style={{ border: 'none' }} >
      {categories.map(cat => <Slider onChange={onChange} min={0} max={10} value={values[cat.name]} />)}
      <Button onClick={onSubmit}>Cast thy vote</Button>
    </fieldset>
  </form>
}

Ballot.propTypes = {}

export default Ballot
