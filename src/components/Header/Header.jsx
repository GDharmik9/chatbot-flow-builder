import React from 'react'
import { Button } from '@mui/material'
import Notification from './Notification'
import './Header.css'



const Header = ({ onSave, errorMessage, messageColor }) => {
    return (
        <header className='header'>
            <div>
            </div>
            <div className='header-notification'>
                <Notification
                    errorMessage={errorMessage}
                    messageColor={messageColor}
                />
            </div>

            <div className='header-btn-container'>
                <Button variant='outlined' color='primary'

                    style={{ padding: '3px 50px', boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px', textTransform: 'capitalize' }}
                    onClick={onSave}
                >
                    save
                </Button>
            </div>
        </header>
    )
}

export default Header