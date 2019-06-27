/**
 *
 * DRList
 *
 */

import React, { memo } from 'react'

function setOrRemoveFromArray (array, value) {
  if (value === null) {
    return []
  }
  const i = array.findIndex(a => a === value)
  let arr = [...array]
  if (i === -1) {
    arr.push(value)
    return arr
  } else {
    return arr.filter(v => v !== value)
  }
}

function DRList ({ list = [], selected = [], onListChange, disabled, name = 'dietary_requirements' }) {
  const selectItem = (e) => {
    if (e.target.name === 'none' && e.target.checked) {
      return onListChange({ target: { name, value: [] } })
    }
    const dietaryRequirementsList = setOrRemoveFromArray(selected, e.target.value)
    onListChange({ target: { name, value: dietaryRequirementsList } })
  }

  return <ul >
    <li>
      <label>
        <input
          type='checkbox'
          name='none'
          value='none'
          checked={selected.length === 0}
          disabled={disabled}
          onChange={selectItem} />None
      </label>
    </li>
    {list.map(item => <li key={item.allergen_name}>
      <label>
        <input
          type='checkbox'
          value={item.allergen_name}
          disabled={disabled}
          onChange={selectItem}
          name={item.allergen_name}
          checked={selected.findIndex(value => value === item.allergen_name) > -1} />{item.allergen_name}</label>
    </li>)}
  </ul>
}

DRList.propTypes = {}

export default DRList
