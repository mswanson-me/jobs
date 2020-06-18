import React from 'react';
import { Typography, Paper } from '@material-ui/core';

export default function Item({item, onClick}) {
    return (
        <Paper onClick={onClick} className="item">
            <div className="itemDetails">
                <Typography variant='h5'>{item.title}</Typography>
                <Typography variant='h6'>{item.company}</Typography>
                <Typography>{item.location}</Typography>
            </div>
            <div>
                <Typography>{item.created_at.split(' ').slice(0,3).join(' ')}</Typography>
            </div>
        </Paper>
    )
}