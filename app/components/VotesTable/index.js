/**
 *
 * VotesTable
 *
 */

import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
// import makeStyles from '@material-ui/core/styles/makeStyles'
// import { colors } from '@toothpic/utils/es/design-system'
import { AgGridReact } from 'ag-grid-react'
import React, { useEffect, useState } from 'react'
// import { getWeekNumber } from 'utils/datetime'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// const useStyles = makeStyles({
//   current: {
//     background: colors.primary['1'],
//     color: 'white'
//   },
//   odd: {
//     background: colors.secondary['04'],
//     color: 'white'
//   }
// })
function VotesTable ({ votes = [] }) {
  const [columnDefs] = React.useState([
    { headerName: 'taste', field: 'taste' },
    { headerName: 'complexity', field: 'complexity' },
    { headerName: 'quantity', field: 'quantity' },
    { headerName: 'total', field: 'total' }
  ])

  const tTotal = votes.reduce((memo, vote) => memo + (vote ? vote.taste : 0), 0)
  const cTotal = votes.reduce((memo, vote) => memo + (vote ? vote.complexity : 0), 0)
  const qTotal = votes.reduce((memo, vote) => memo + (vote ? vote.quantity : 0), 0)
  const total = tTotal + cTotal + qTotal

  const [data, setData] = useState([])
  useEffect(() => {
    setData(votes)
    return ()=>{}
  }, [votes])

  const defaultColDefs = { sortable: true, filter: true }
  const rowClassRules = {
    // [classes.current]: function (params) {
    //   return params.data.week === currentWeek
    // },
    // [classes.odd]: function (params) {
    //   return params.node.rowIndex % 2 === 0
    // }
  }

  return (
    <Card>
      <CardHeader>
        <p>Taste: {tTotal}</p>
        <p>Complexity: {cTotal}</p>
        <p>Quantity: {qTotal}</p>
        <p>Total: {total}</p>
      </CardHeader>
      <CardContent>
        <div style={{ height: '800px', width: '900px' }} className='ag-theme-material'>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={data}
            pagination
            defaultColDef={defaultColDefs}
            rowClassRules={rowClassRules}
          />
        </div>
      </CardContent>
    </Card>
  )
}

VotesTable.propTypes = {}

export default VotesTable
