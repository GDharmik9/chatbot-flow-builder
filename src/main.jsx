import React from 'react'
import ReactDOM from 'react-dom/client'
import Flowchart from './components/Flowchart/Flowchart'
import { ReactFlowProvider } from "reactflow";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Flowchart />
    </ReactFlowProvider>
  </React.StrictMode>,
)
