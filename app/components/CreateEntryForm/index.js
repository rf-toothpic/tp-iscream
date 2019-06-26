/**
 *
 * CreateEntryForm
 *
 */

import { TextField } from '@material-ui/core'
import AllergensList from 'components/AllergensList'
import Button from 'components/Button'
import React, { memo, useState } from 'react'
import { getWeekNumber, toDateString } from 'utils/datetime'

const mockList = [
  { name: 'Nuts', value: 0 }
]


function CreateEntryForm ({ onSubmit, loading, error, allergensList = mockList }) {
  const d = new Date()

  const [data, setData] = useState({ name: '', date: d, dateString: toDateString(d), allergens: [], aSelected: false })

  const onChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const onDateChange = (e) => {
    e.preventDefault()
    setData({ ...data, dateString: e.target.value, date: new Date(e.target.value) })
  }

  const onAllergensChange = (allergens) => {
    return setData({ ...data, allergens, aSelected: true })
  }

  const submit = (e) => {
    e.preventDefault()
    onSubmit({ name: data.name, date: data.date, allergens: data.allergens })
  }

  return <form onSubmit={submit}>
    <TextField name='name' value={data.name} disabled={loading} error={!!error} fullWidth onChange={onChange} />
    <TextField type='date' name='date' defaultValue={data.dateString} disabled={loading} error={!!error} fullWidth onChange={onDateChange} />
    <TextField disabled value={getWeekNumber(data.date)} />
    <AllergensList selected={data.allergens} list={allergensList} onChange={onAllergensChange} />
    <Button type='submit' onClick={submit} disabled={loading || !data.aSelected}>Create Entry</Button>
  </form>
}

CreateEntryForm.propTypes = {}

export default memo(CreateEntryForm)
