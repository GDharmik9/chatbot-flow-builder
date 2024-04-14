import React from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './Sidebar.css'

const Sidebar = ({
    nodeName,
    setNodeName,
    selectedNode,
    setSelectedElements,
}) => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleInputChange = (event) => {
        setNodeName(event.target.value);
    };

    return (
        <aside className='sidebar-container'>
            {selectedNode ?
                <Card sx={{ width: '100%', marginTop: '20px', boxShadow: 'inherit', borderBottom: '0.5px solid grey', borderRadius: 'none', padding: '0' }}>
                    <CardHeader

                        sx={{ borderTop: '0.5px solid grey', borderBottom: '0.5px solid grey', color: 'black', height: '20px' }}
                        avatar={
                            <IconButton onClick={() => setSelectedElements([])}> <KeyboardBackspaceIcon /></IconButton>
                        }
                        title="Message"
                    />
                    <CardContent>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-multiline-static"
                            label="Text"
                            multiline
                            rows={3}
                            value={nodeName}
                            onChange={handleInputChange}
                        />
                    </CardContent>
                </Card> :
                <div className='sidebar-node'
                    onDragStart={(event) => onDragStart(event, "node")}
                    draggable
                >
                    <span className='node-icon'><WhatsAppIcon /></span>
                    Message Node
                </div>}
        </aside>
    )
}

export default Sidebar