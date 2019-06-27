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
const DATA_FIELD = 'allergen_name'
function DRList ({ list = [], selected = [], onListChange, disabled, name = 'dietary_requirements', showSelected = false }) {
  const selectItem = (e) => {
    if (e.target.name === 'none' && e.target.checked) {
      return onListChange({ target: { name, value: [] } })
    }
    const dietaryRequirementsList = setOrRemoveFromArray(selected, e.target.value)
    onListChange({ target: { name, value: dietaryRequirementsList } })
  }

  const filterSelected = (list, selected) => {
    return list.filter(l => selected.findIndex(a => a[DATA_FIELD]))
  }

  const data = showSelected ? filterSelected(list, selected) : list

  if (showSelected) {
    if (!data.length) {
      return 'Pure clean like'
    }
    return <ul>
      {data.map(d => <li>{d[DATA_FIELD]}</li>)}
    </ul>
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
    {list.map(item => <li key={item[DATA_FIELD]}>
      <label>
        <input
          type='checkbox'
          value={item[DATA_FIELD]}
          disabled={disabled}
          onChange={selectItem}
          name={item[DATA_FIELD]}
          checked={selected.findIndex(value => value === item[DATA_FIELD]) > -1} />{item[DATA_FIELD]}</label>
    </li>)}
  </ul>
}

DRList.propTypes = {}

export default DRList
