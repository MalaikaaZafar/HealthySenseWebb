import { Button, Container, Typography, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";import {styled} from "@mui/system";


const CustomTableRow = styled(TableRow)(({}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    width: '100%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
}));

const CustomTableCell = styled(TableCell)(({}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    width: '100%',
    border:'none',
    gap:'10px'
}));

const DoctorServices = ({ DoctorData, setDoctorData, HandleServicesEdit, setChanges }) => {
    return (
        <Table style={{marginTop:'-20px'}}>
            <TableHead>
                <CustomTableRow>
                    <CustomTableCell style={{fontWeight:'bold', fontSize:'16px', width:'80%'}}>Service</CustomTableCell>
                    <CustomTableCell style={{ width:'16%'}}></CustomTableCell>
                </CustomTableRow>
            </TableHead>
            <TableBody>
            {
                DoctorData.services.length > 0 ?
                    DoctorData.services.map((service, index) => {
                        return (
                            <CustomTableRow>
                                <CustomTableCell style={{ width:'80%'}}>{service}</CustomTableCell>
                                <CustomTableCell style={{ width:'16%' , flexWrap:'wrap'}}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            HandleServicesEdit(index);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setDoctorData(draft => {
                                                draft.services.splice(index, 1);
                                            })
                                            setChanges(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </CustomTableCell>
                            </CustomTableRow>
                        )
                    })
                    :
                    <CustomTableRow>
                        <CustomTableCell colSpan={3} style={{ textAlign: 'center' }}>No Services Added</CustomTableCell>
                    </CustomTableRow>
            }
            </TableBody>
        </Table>
    );
}

export default DoctorServices;