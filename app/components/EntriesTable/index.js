/**
 *
 * AssessorCaseHistoryView
 *
 */

import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

function EntriesTable ({ entries }) {
  const [columnDefs] = React.useState([
    { headerName: 'wk', field: 'week' },
    { headerName: 'Chef', field: 'user.name' },
    { headerName: 'Entry Name', field: 'name' },
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

  return (
    <Card>
      <CardContent>
        <div style={{ height: '800px', width: '900px' }} className='ag-theme-material'>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={data}
            pagination
            defaultColDef={defaultColDefs}
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
