import React from 'react';
import { Typography } from '@material-ui/core';

import Item from './Item';
import ItemModal from './ItemModal';

export default function List({list}) {

    // modal 
    const [open, setOpen] = React.useState(false);
    const [selectedItem, selectItem] = React.useState({});

    function handleClickOpen() { 
        setOpen(true); 
    };

    function handleClose(){ 
        setOpen(false); 
    };
  
    //
    const numJobs = list.length;

    return (
        <div className="list">
            <ItemModal open={open} item={selectedItem} handleClose={handleClose} />
            <Typography variant="h4" component="h1">
                This is the job board
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} jobs.
            </Typography>
            {
               list.map(
                   (item, i) => <Item key={i} item={item} onClick={() => {
                    console.log('clicked');
                    handleClickOpen();
                    selectItem(item);
                    console.log(item);
                   }} /> 
                   )
            }
        </div>
    )
}