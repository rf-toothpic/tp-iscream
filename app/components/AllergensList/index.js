/**
 *
 * AllergensList
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

function AllergensList ({ list = [], value = [], onChange, disabled, name = 'allergens' }) {
  const selectItem = (e) => {
    if (e.target.name === 'none' && e.target.checked) {
      return onChange({ target: { name, value: [] } })
    }
    const allergensList = setOrRemoveFromArray(value, e.target.name)
    onChange({ target: { name, value: allergensList } })
  }

  return <ul >
    <li>
      <label>
        <input
          type='checkbox'
          name='none'
          value='none'
          checked={value.length === 0}
          disabled={disabled}
          onChange={selectItem} />None
      </label>
    </li>
    {list.map(item => <li key={item.name}>
      <label>
        <input
          type='checkbox'
          value={item.value}
          disabled={disabled}
          onChange={selectItem}
          name={item.value}
          checked={value.findIndex(value => {
            return value.toString() === item.value.toString()
          }) > -1} />{item.name}</label>
    </li>)}
  </ul>
}

AllergensList.propTypes = {}

export default memo(AllergensList)
