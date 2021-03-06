/**
 *
 * AssessorCaseHistoryView
 *
 */

import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { getWeekNumber } from 'utils/datetime'
import { colors } from '@toothpic/utils/es/design-system'

const useStyles = makeStyles({
  current: {
    background: colors.primary['1'],
    color: 'white'
  },
  odd: {
    background: colors.secondary['04'],
    color: 'white'
  }
})
function EntriesTable ({ entries }) {
  const classes = useStyles()
  const currentWeek = getWeekNumber(new Date())
  const [columnDefs] = React.useState([
    // { headerName: 'current', cellRenderer: (params) => params.data.week === currentWeek ? '*' : '' },
    { headerName: 'wk', field: 'week' },
    { headerName: 'Chef', field: 'user_nickname' },
    { headerName: 'Entry Name', field: 'entry_name' },
    { headerName: 'Votes',
      cellRenderer: params => {
        return params.data.votes.length
      } },
    { headerName: 'Total',
      cellRenderer: params => {
        return params.data.votes.reduce(v => v ? v.complexity + v.taste + v.quantity : 0, 0) / (params.data.votes.length || 1)
      } },
    { headerName: 'Taste',
      cellRenderer: params => {
        return params.data.votes.reduce(v => v ? v.taste : 0, 0) / (params.data.length || 1)
      } },
    { headerName: 'Complexity',
      cellRenderer: params => {
        return params.data.votes.reduce(v => v ? v.complexity : 0, 0) / (params.data.length || 1)
      } },
    { headerName: 'Quantity',
      cellRenderer: params => {
        return params.data.votes.reduce(v => v ? v.quantity : 0, 0) / (params.data.length || 1)
      } },
    {
      headerName: 'View',
      cellRendererFramework: function ({ data }) {
        return <a href={`${window.location.protocol}//${window.location.host}/entry/${data.id}`}>View</a>
      }
    }
  ])

  const [data, setData] = useState([])
  useEffect(() => {
    setData(entries)
    return () => {}
  }, [entries])

  const defaultColDefs = { sortable: true, filter: true }
  const rowClassRules = {
    [classes.current]: function (params) {
      return params.data.week === currentWeek
    },
    [classes.odd]: function (params) {
      return params.node.rowIndex % 2 === 0
    }
  }

  return (
    <Card>
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

EntriesTable.propTypes = {
  entries: PropTypes.array.isRequired
}

export default EntriesTable
