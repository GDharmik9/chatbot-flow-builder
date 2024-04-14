import React from 'react'
import './Notification.css'

const Notification = ({ errorMessage, messageColor }) => {


    if (errorMessage) {
        return <div className={messageColor}>{errorMessage}</div>
    }
    return <div style={{ padding: 19 }}></div>
}

export default Notification