import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard.jsx'
import { ReactFlowProvider } from "reactflow";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Dashboard />
    </ReactFlowProvider>
  </React.StrictMode>,
)
