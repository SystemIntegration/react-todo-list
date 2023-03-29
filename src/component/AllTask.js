import React from 'react'
import { Button, TableCell, TableRow, Typography} from "@mui/material";

function AllTask(props) {

    let mapValue = props.data
    let deleteTask = props.deleteTask

    return (
        mapValue.map((t, index) => (
            <TableRow key={index} >
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                <Typography >{t.split('-')[0]}</Typography>
                    <Button style={{ position: 'absolute', left: '73%', border: '1px solid gray', padding: '1px 2px' }} onClick={() => deleteTask(index)}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        ))

    )
}

export default AllTask