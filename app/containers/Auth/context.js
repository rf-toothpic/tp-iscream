import React from 'react'
import { getAssessorId } from 'utils/localStorage'

const AssessorContext = React.createContext({ assessor_id: getAssessorId() })
export default AssessorContext
