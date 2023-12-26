import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";


const CertificateTable = ({ DoctorData, setDoctorData, HandleCertificateEdit, setChanges }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Issue Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {DoctorData.certificates.length > 0 ? DoctorData.certificates.map((certificate, index) => {
                    return (
                        <TableRow>
                            <TableCell>{certificate.name}</TableCell>
                            <TableCell>{certificate.description}</TableCell>
                            <TableCell>{certificate.issueDate}</TableCell>
                            <TableCell>{certificate.expiryDate}</TableCell>
                            <TableCell>{certificate.approvedStatus ? "Approved" : "Not Approved"}</TableCell>
                            <TableCell>
                                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }}
                                    onClick={() => { HandleCertificateEdit(index) }}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}
                                    onClick={() => {
                                        setDoctorData(draft => {
                                            draft.certificates.splice(index, 1);
                                        })
                                        setChanges(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                }) : <TableRow>
                    <TableCell>No Certificates</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                }
            </TableBody>
        </Table>
    );
}

export default CertificateTable;