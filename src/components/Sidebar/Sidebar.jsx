import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import './Sidebar.css'

const Sidebar = () => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className='sidebar-container'>
            <div className='sidebar-header'>
                <h3>Node Panel</h3>
            </div>
            <div className='sidebar-node'
                onDragStart={(event) => onDragStart(event, "textnode")}
                draggable
            >
                <span className='node-icon'><WhatsAppIcon /></span>
                Message Node
            </div>
        </aside>
    )
}

export default Sidebar