/**
 *
 * CreateEntryForm
 *
 */

import { TextField } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DRList from 'components/DRList'
import Button from 'components/Button'
import UploadImage from 'components/UploadImage'
import React, { memo, useState } from 'react'
import { useCurrentUser } from 'services/API/hooks'
import { getWeekNumber, toDateString } from 'utils/datetime'
import { colors } from '@toothpic/utils/es/design-system'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: colors.tertiary['1']
  }
}))

function MediaOrUpload ({ data, classes, onSelect }) {
  const [newImage, toggleUploadImage] = useState(false)
  const onClick = () => toggleUploadImage(!newImage)
  return <>
    {data.image_url && !newImage && <>
      <CardMedia title={data.name} className={classes.media} image={data.image_url} />
      <Button onClick={onClick}>New
      </Button>
    </>
    }
    {!data.image_url || newImage && <UploadImage entryId={data.id} className={classes.media} onSelect={onSelect} />}
  </>
}

function CreateEntryForm ({ onSubmit, loading, error, entry, drList, disabled = false }) {
  
  const d = new Date()

  const [data, setData] = useState({ entry_name: '', date: d, dateString: toDateString(d), dietary_requirements: [], ...entry })

  const onChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onDateChange = (e) => {
    e.preventDefault()
    setData({ ...data, dateString: e.target.value, date: new Date(e.target.value) })
  }

  // eslint-disable-next-line camelcase
  const onDRChange = ({ target: { value: dietary_requirements } }) => {
    return setData({ ...data, dietary_requirements })
  }

  // eslint-disable-next-line camelcase
  const onImageChange = (d) => {
    return setData({ ...data, image_url: d })
  }

  const submit = (e) => {
    e.preventDefault()
    // console.log(data)
    onSubmit({ name: data.name, date: data.date, dietary_requirements: data.dietary_requirements })
  }

  const formDisabled = disabled || loading
  const submitDisabled = formDisabled || !(data.name)
  const user = useCurrentUser(entry ? entry.user_id : null) || { name: '-' }
  const classes = useStyles()

  return <form onSubmit={submit}>
    <Card>
      <CardHeader avatar={<Avatar className={classes.avatar}>{user.name.substr(0, 1)}</Avatar>} title='Competition Entry' />
      <MediaOrUpload classes={classes} data={data} onSelect={onImageChange} />
      <CardContent>
        <fieldset disabled={formDisabled} style={{ border: 'none' }}>
          <InputLabel>Name</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} name='entry_name' value={data.name} disabled={loading} error={!!error} fullWidth onChange={onChange} />

          <InputLabel>Date</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} type='date' name='date' defaultValue={data.dateString} disabled={loading} error={!!error} fullWidth onChange={onDateChange} />

          <InputLabel>Week</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} disabled value={getWeekNumber(data.date)} />

          <DRList selected={data.dietary_requirements} list={drList} onListChange={onDRChange} />

        </fieldset>
      </CardContent>
      <CardActions >
        <Button type='submit' onClick={submit} disabled={submitDisabled}>Create Entry</Button>
      </CardActions>
    </Card>
  </form>
}

CreateEntryForm.propTypes = {}

export default CreateEntryForm
