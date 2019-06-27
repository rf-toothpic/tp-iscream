/**
 *
 * Ballot
 *
 */

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Textarea from '@material-ui/core/InputBase/Textarea'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { colors } from '@toothpic/utils/es/design-system'
import { MediaOrUpload } from 'components/CreateEntryForm'
import VoteButton from 'components/VoteButton'
import Confetti from 'react-dom-confetti'
// import DRList from 'components/DRList'
import Slider from 'rc-slider'
import { Button, TextField } from '@material-ui/core'
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css'
import React from 'react'
import { useCurrentUser } from 'services/API/hooks'
import { getWeekNumber } from 'utils/datetime'
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

function Ballot ({ submit, entry }) {
  const [values, setValues] = React.useState(categories.reduce((memo, cat) => Object.assign(memo, { [cat.name]: DEFAULT_VALUE }), {}))
  const [submitting, setSubmitting] = React.useState(0)
  const onChange = (e) => {
    setSubmitting(submitting + 1)
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  let user = useCurrentUser(entry && entry.user_id)

  const updateTaste = (n) => setValues({ ...values, taste: n })
  const updateComp = (n) => setValues({ ...values, complexity: n })
  const updateQuant = (n) => setValues({ ...values, quantity: n })
  const onSubmit = () => {
    submit({ ...values, competition_entry_id: entry.id })
  }
  const classes = useStyles()

  return <div>
    {entry && <Card>
      <CardHeader avatar={<Avatar className={classes.avatar}>{user.nickname && user.nickname.substr(0, 1).toUpperCase()}</Avatar>} title={entry.entry_name} />
      <MediaOrUpload classes={classes} data={entry} editable={false} />
      <CardContent>
        <fieldset disabled style={{ border: 'none' }}>
          <InputLabel>Name</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} name='entry_name' value={entry.entry_name} disabled fullWidth onChange={onChange} />

          <InputLabel>Chef</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} name='entry_name' value={user.nickname} disabled fullWidth onChange={onChange} />

          <InputLabel>Date</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} type='date' name='date' defaultValue={entry.dateString} disabled fullWidth />

          <InputLabel>Week</InputLabel>
          <TextField InputProps={{ disableUnderline: true }} disabled value={getWeekNumber(entry.date)} />

        </fieldset>
      </CardContent>
    </Card>}
    <br />
    <br />
    <form>
      <Card>
        <CardContent>
          <fieldset style={{ border: 'none' }} >

            <h3>Taste</h3>
            <Slider onChange={updateTaste} min={0} max={10} value={values.taste} />

            <h3>Complexity</h3>
            <Slider onChange={updateComp} min={0} max={10} value={values.complexity} />

            <h3>Quantity</h3>
            <Slider onChange={updateQuant} min={0} max={10} value={values.quantity} />

            <h3>Comments</h3>
            <Textarea style={{ width: '100%', height: 200 }} value={values.comment} onChange={onChange} name='comment' />
          </fieldset>
        </CardContent>
        <CardActions>
          <VoteButton onSubmit={onSubmit} variant='contained' color='primary'>Cast thy vote</VoteButton>
        </CardActions></Card>
    </form>
  </div>
}

Ballot.propTypes = {}

export default Ballot
