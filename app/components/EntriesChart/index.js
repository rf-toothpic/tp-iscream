/**
 *
 * EntriesChart
 *
 */

import React, { memo } from 'react'

import {
  XYPlot,
  YAxis,
  XAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  LabelSeries
} from 'react-vis'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import { Card } from '@material-ui/core'
import _ from 'lodash'

export function averageEntries (filteredEntries) {
  return filteredEntries.map((ent) => ({
    nickname: ent.user_nickname ? ent.user_nickname : '',
    taste: _.sumBy(ent.votes, 'taste') / ent.votes.length,
    complexity: _.sumBy(ent.votes, 'complexity') / ent.votes.length,
    quantity: _.sumBy(ent.votes, 'quantity') / ent.votes.length
  }))
}

function EntriesChart ({ entries }) {
  const filteredEntries = entries.filter(function (ent) {
    return ent.votes.length > 0 && ent.user_nickname
  })

  const averagedEntries = averageEntries(filteredEntries)

  const tasteMax = Math.max.apply(Math, averagedEntries.map((o) => { return o.taste }))
  const complexityMax = Math.max.apply(Math, averagedEntries.map((o) => { return o.complexity }))
  const quantityMax = Math.max.apply(Math, averagedEntries.map((o) => { return o.quantity }))

  return (
    <div>
      <Card>
        <CardContent>
          <div style={{ height: '800px', width: '900px' }} className='ag-theme-material'>
            <XYPlot margin={{ left: 100 }} width={300} height={300} stackBy='x' yType='ordinal' >
              <VerticalGridLines />
              <HorizontalGridLines />
              <YAxis />
              <XAxis />
              <HorizontalBarSeries color='#219A9D' data={averagedEntries.map((d) => ({ y: d.nickname, x: d.taste ? d.taste : 0 }))} />
              <HorizontalBarSeries color='#004E64' data={averagedEntries.map((d) => ({ y: d.nickname, x: d.complexity ? d.complexity : 0 }))} />
              <HorizontalBarSeries color='#FE7B73' data={averagedEntries.map((d) => ({ y: d.nickname, x: d.quantity ? d.quantity : 0 }))} />
              <LabelSeries labelAnchorX='end' labelAnchorY='middle' data={averagedEntries.map((d) => ({ y: d.nickname, x: d.taste ? d.taste : 0, label: d.taste === tasteMax ? '🤤' : '' }))} />
              <LabelSeries labelAnchorX='end' labelAnchorY='middle' data={averagedEntries.map((d) => ({ y: d.nickname, x: d.complexity ? d.complexity : 0, label: d.complexity === complexityMax ? '😖' : '' }))} />
              <LabelSeries labelAnchorX='end' labelAnchorY='middle' data={averagedEntries.map((d) => ({ y: d.nickname, x: d.quantity ? d.quantity : 0, label: d.quantity === quantityMax ? '🐳' : '' }))} />
            </XYPlot>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

EntriesChart.propTypes = {
  entries: PropTypes.array.isRequired
}

export default memo(EntriesChart)
