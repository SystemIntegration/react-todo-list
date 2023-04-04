import React from 'react'
import { Button, Checkbox, TableCell, TableRow, Typography} from "@mui/material";

function ActiveTask(props) {
    let mapValue = props.data;
    let checked = props.checked;
    let deleteTask = props.deleteTask;

    return (
        mapValue.map((t, index) => (
            <TableRow key={index} >
                    {t.split('-')[1] === 'false' &&
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        value={t}
                        label="Delivery Methods"
                        name={t}
                        checked={t.split('-')[1] === 'false' && false}
                        onClick={(e) => checked(e,"ActiveTask")} style={{ marginRight: '1rem' }}
                    />
                    <Typography >{t.split('-')[0]}</Typography>
                    <Button style={{ position: 'absolute', left: '73%', border: '1px solid gray', padding: '1px 2px' }} onClick={() => deleteTask(index)}>
                        Delete
                    </Button>
                </TableCell>
                    }
            </TableRow>
        ))

    )
}

export default ActiveTask