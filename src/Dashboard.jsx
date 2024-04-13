import React from 'react'



import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'

import './Dashboard.css'
import Flowchart from './components/Flowchart/Flowchart'

const Dashboard = () => {
  return (
    <div className='Container'>
      
        <Header />
        <Flowchart />
        <Sidebar />
     
    </div>
  )
}

export default Dashboard