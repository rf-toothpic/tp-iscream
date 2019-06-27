/**
 *
 * Ballot
 *
 */

import Textarea from '@material-ui/core/InputBase/Textarea'
import Slider, { Range } from 'rc-slider'
import { Button } from '@material-ui/core'
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

function Ballot ({ submit, entry }) {
  const [values, setValues] = React.useState(categories.reduce((memo, cat) => Object.assign(memo, { [cat.name]: DEFAULT_VALUE })))
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const updateTaste = (n) => setValues({ ...values, taste: n })
  const updateComp = (n) => setValues({ ...values, complexity: n })
  const updateQuant = (n) => setValues({ ...values, quantity: n })
  const onSubmit = (e) => {
    e.preventDefault()
    submit({ ...values, competition_entry_id: entry.id })
  }

  return <form>
    <fieldset style={{ border: 'none' }} >

      <h3>Taste</h3>
      <Slider onChange={updateTaste} min={0} max={10} value={values.taste} />

      <h3>Complexity</h3>
      <Slider onChange={updateComp} min={0} max={10} value={values.complexity} />

      <h3>Quantity</h3>
      <Slider onChange={updateQuant} min={0} max={10} value={values.quantity} />

      <h3>Comments</h3>
      <Textarea style={{ width: '100%', height: 200 }} value={values.comment} onChange={onChange} name='comment' />
      <Button onClick={onSubmit}>Cast thy vote</Button>
    </fieldset>
  </form>
}

Ballot.propTypes = {}

export default Ballot
