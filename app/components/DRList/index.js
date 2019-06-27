/**
 *
 * DRList
 *
 */

import React, { memo } from 'react'
import Img from '../Header/Img'
import Icon from '../Header/Icon'
import CeleryIcon from 'images/celery.png'
import CrustaceansIcon from 'images/crustaceans.png'
import EggIcon from 'images/egg.png'
import FishIcon from 'images/fish.png'
import LupinIcon from 'images/lupin.png'
import MilkIcon from 'images/milk.png'
import MolluscIcon from 'images/mollusc.png'
import MustardIcon from 'images/mustard.png'
import NutsIcon from 'images/nuts.png'
import PeanutIcon from 'images/peanuts.png'
import SesameIcon from 'images/sesame.png'
import SoybeanIcon from 'images/soybean.png'
import SulfitesIcon from 'images/sulfites.png'
import VeganIcon from 'images/vegan.png'
import VegetarianIcon from 'images/vegetarian.png'
import WheatIcon from 'images/wheat.png'
import NoneIcon from 'images/none.png'

function getIcon (relativePath) {
  console.log('Relative path:', relativePath)
  var icon
  switch (relativePath) {
    case '/images/celery.png':
      icon = CeleryIcon
      break
    case '/images/crustaceans.png':
      icon = CrustaceansIcon
      break
    case '/images/egg.png':
      icon = EggIcon
      break
    case '/images/fish.png':
      icon = FishIcon
      break
    case '/images/lupin.png':
      icon = LupinIcon
      break
    case '/images/milk.png':
      icon = MilkIcon
      break
    case '/images/mollusc.png':
      icon = MolluscIcon
      break
    case '/images/mustard.png':
      icon = MustardIcon
      break
    case '/images/nuts.png':
      icon = NutsIcon
      break
    case '/images/peanuts.png':
      icon = PeanutIcon
      break
    case '/images/sesame.png':
      icon = SesameIcon
      break
    case '/images/soybean.png':
      icon = SoybeanIcon
      break
    case '/images/sulfites.png':
      icon = SulfitesIcon
      break
    case '/images/vegan.png':
      icon = VeganIcon
      break
    case '/images/vegetarian.png':
      icon = VegetarianIcon
      break
    case '/images/wheat.png':
      icon = WheatIcon
      break
    default:
      icon = NoneIcon
      break
  }

  return icon
}

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
      <Icon src={getIcon('')} alt='icon' />
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
      <Icon src={getIcon(item.relative_path)} alt='icon' />
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
