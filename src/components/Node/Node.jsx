import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MessageIcon from '@mui/icons-material/Message';
import Typography from '@mui/material/Typography';
import { Handle, Position } from 'reactflow'

const Node = ({ data }) => {
  return (
    <div>
      <Card sx={{ width: '250px' }}>
        <CardHeader

          sx={{ backgroundColor: '#65d071', color: 'black', }}
          avatar={
            <MessageIcon />
          }
          action={
            <WhatsAppIcon sx={{ backgroundColor: '#65d071', color: 'white' }} />
          }
          title={data.heading}
        />
        <CardContent>
          <Typography variant="body1" color="black">
            {data.label}
          </Typography>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} id="source" />
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  )
}

export default Node