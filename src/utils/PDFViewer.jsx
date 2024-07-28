import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFViewer extends React.Component {
  state = {
    selectedFile: null,
    numPages: null,
    pageNumber: 1,
    pdfData: null,
  };

  onFileLoad = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ pdfData: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages, pdfData } = this.state;
    return (
      <>
        <input type="file" accept=".pdf" onChange={this.onFileLoad} />
        {pdfData && (
          <Document file={pdfData} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={200} />
          </Document>
        )}
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </>
    );
  }
}

export default PDFViewer;
