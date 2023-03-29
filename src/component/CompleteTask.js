import React from 'react'
import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";

function CompleteTask(props) {
    let mapValue = props.data

    return (
        mapValue.map((t, index) => (
            <TableRow key={index} >
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox checked={true} />
                    <Typography ><s>{t.split('-')[0]}</s></Typography>
                </TableCell>
            </TableRow>
        ))

    )
}

export default CompleteTask