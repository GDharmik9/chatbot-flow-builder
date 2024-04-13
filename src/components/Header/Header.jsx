import React from 'react'
import { Button } from '@mui/material'

import './Header.css'

const Header = () => {
    return (
        <header className='header'>
            <div>
            </div>
            <div className='header-notification'>
                <h1>Flowchart</h1>
            </div>

            <div className='header-btn-container'>
                <Button variant='outlined' color='primary'

                    style={{ padding: '3px 50px', boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px', textTransform: 'capitalize' }}>
                    save
                </Button>
            </div>
        </header>
    )
}

export default Header