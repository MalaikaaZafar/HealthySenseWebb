import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import {styled} from "@mui/system";


const CustomTableRow = styled(TableRow)(({}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
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


const CertificateTable = ({ DoctorData, setDoctorData, HandleCertificateEdit, setChanges }) => {
    return (
        <Table style={{marginTop:'-20px'}}>
            <TableHead>
                <CustomTableRow >
                    <CustomTableCell className="adjust" style={{fontWeight:'bold', fontSize:'16px', width:'15%'}}>Name</CustomTableCell>
                    <CustomTableCell className="disappear" style={{fontWeight:'bold', fontSize:'16px', width:'25%'}}> Description</CustomTableCell>
                    <CustomTableCell className="disappear" style={{fontWeight:'bold', fontSize:'16px', width:'15%'}}>Issued Date</CustomTableCell>
                    <CustomTableCell className="disappear" style={{fontWeight:'bold', fontSize:'16px', width:'15%'}}>Expiry Date</CustomTableCell>
                    <CustomTableCell className="adjust" style={{fontWeight:'bold', fontSize:'16px', width:'15%'}}>Approved Status</CustomTableCell>
                    <CustomTableCell style={{ width:'20%'}}></CustomTableCell>
                </CustomTableRow>
            </TableHead>
            <TableBody>
                {DoctorData.certificates.length > 0 ? DoctorData.certificates.map((certificate, index) => {
                    return (
                        <CustomTableRow> 
                            <CustomTableCell className="adjust" style={{ width:'15%'}}>{certificate.name}</CustomTableCell>
                            <CustomTableCell className="disappear" style={{ width:'25%'}}>{certificate.description}</CustomTableCell>
                            <CustomTableCell className="disappear" style={{ width:'15%'}}>{certificate.issueDate}</CustomTableCell>
                            <CustomTableCell className="disappear" style={{ width:'15%'}}>{certificate.expiryDate}</CustomTableCell>
                            <CustomTableCell className="adjust" style={{ width:'15%'}}>{certificate.approvedStatus ? "Approved": "Not Approved"}</CustomTableCell>
                            <CustomTableCell style={{ width:'20%', flexWrap:'wrap'}}>
                                <Button
                                    variant="contained"
                                    onClick={() => HandleCertificateEdit(index)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setDoctorData({
                                            ...DoctorData,
                                            certificates: DoctorData.certificates.filter((certificate, i) => i !== index)
                                        })
                                        setChanges(true)
                                    }}
                                >
                                    Delete
                                </Button>
                            </CustomTableCell>
                        </CustomTableRow>
                    )
                }) : <CustomTableRow>
                    <CustomTableCell>No Certificates</CustomTableCell>
                </CustomTableRow>
                }
            </TableBody>
        </Table>
    );
}

export default CertificateTable;