/**
 *
 * UploadImage
 *
 */

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {Button} from '@material-ui/core'

/*
import RootRef from '@material-ui/core/RootRef'

function PaperDropzone() {
  const {getRootProps, getInputProps} = useDropzone()
  const {ref, ...rootProps} = getRootProps()

  <RootRef rootRef={ref}>
    <Paper {...rootProps}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </Paper>
  </RootRef>
}
 */
function UploadImage ({onSelect}) {
  const [img, setImg] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      // setImg(`${binaryStr}`)
      onSelect(binaryStr)
    }

    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      {/*{img && <img style={{ height: 100 }} src={img} />}*/}
      <input {...getInputProps()} />
      <Button variant="contained">Drag 'n' drop some files here, or click to select files</Button>
    </div>
  )
}

export default UploadImage
