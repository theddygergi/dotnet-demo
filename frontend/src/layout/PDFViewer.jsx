import React from 'react'
import { Viewer } from '@react-pdf-viewer/core'

function PDFViewer(pdfUrl) {
  return (
    <div style={{height: '500px'}}>
      <Viewer fileUrl={pdfUrl}/>
    </div>
  )
}

export default PDFViewer;
