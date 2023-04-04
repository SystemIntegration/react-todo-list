import React from 'react'
import { Button, Checkbox, TableCell, TableRow, Typography } from "@mui/material";

function CompleteTask(props) {
    let mapValue = props.data;
    let checked = props.checked;
    let deleteTask = props.deleteTask;

    return (
        mapValue.map((t, index) => (
            <TableRow key={index} >
                {t.split('-')[1] === 'true' &&
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        value={t}
                        label="Delivery Methods"
                        name={t}
                        checked={t.split('-')[1] === 'true' && true}
                        onClick={(e) => checked(e,"CompleteTask")} style={{ marginRight: '1rem' }}
                    />
                    <Typography ><s>{t.split('-')[0]}</s></Typography>
                    <Button style={{ position: 'absolute', left: '73%', border: '1px solid gray', padding: '1px 2px' }} onClick={() => deleteTask(index)}>
                        Delete
                    </Button>
                </TableCell>}
            </TableRow>
        ))

    )
}

export default CompleteTask