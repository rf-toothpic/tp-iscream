/**
 *
 * AssessorCaseHistoryView
 *
 */

import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { drawerWidth } from 'components/Header'
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
    { headerName: 'current', cellRenderer: (params) => params.data.week === currentWeek ? '*' : '' },
    { headerName: 'wk', field: 'week' },
    { headerName: 'Chef', field: 'nickname' },
    { headerName: 'Entry Name', field: 'entry_name' },
    { headerName: 'Total', field: 'total' },
    { headerName: 'Taste', field: 'taste' },
    { headerName: 'Complexity', field: 'complexity' },
    { headerName: 'Quantity', field: 'quantity' },
    {
      headerName: 'View',
      cellRenderer: function (params) {
        return `<a href="${window.location.protocol}//${window.location.host}/competition_entries/${
          params.data.id
        }?schema=${params.data.schema}&audit=true" target="_blank">View</a>`
      }
    }
  ])

  const [data, setData] = useState([])
  useEffect(() => {
    setData(entries)
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
