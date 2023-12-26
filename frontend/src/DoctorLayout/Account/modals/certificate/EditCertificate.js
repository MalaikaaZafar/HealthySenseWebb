import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const EditCertificate = ({ DoctorData, setDoctorData, CertificateEditModal, CertificateEditModalClose, setChanges, CertificateIndex }) => {
    const [Certificates, setCertificates] = useImmer({
        name: "",
        description: "",
        issueDate: "",
        expiryDate: "",
        approvedStatus: false,
        File: null,
    });

    const HandleCertificateEditChange = () => {
        if (Certificates.name.trim() === "" || Certificates.description.trim() === "" || Certificates.issueDate === "" || Certificates.expiryDate === "" || Certificates.File === null) {
            alert("Please fill all the fields");
            return;
        }
        const CheckIssueDate = Certificates.issueDate.split("-");
        const CheckExpiryDate = Certificates.expiryDate.split("-");
        if (CheckIssueDate[0] > CheckExpiryDate[0]) {
            alert("Issue Date cannot be greater than Expiry Date");
            return;
        }
        else if (CheckIssueDate[0] === CheckExpiryDate[0]) {
            if (CheckIssueDate[1] > CheckExpiryDate[1]) {
                alert("Issue Date cannot be greater than Expiry Date");
                return;
            }
            else if (CheckIssueDate[1] === CheckExpiryDate[1]) {
                if (CheckIssueDate[2] >= CheckExpiryDate[2]) {
                    alert("Issue Date cannot be greater than or Equal to Expiry Date");
                    return;
                }
            }
        }
        setDoctorData(draft => {
            draft.certificates[CertificateIndex].name = Certificates.name;
            draft.certificates[CertificateIndex].description = Certificates.description;
            draft.certificates[CertificateIndex].issueDate = Certificates.issueDate;
            draft.certificates[CertificateIndex].expiryDate = Certificates.expiryDate;
            draft.certificates[CertificateIndex].approvedStatus = Certificates.approvedStatus;
            draft.certificates[CertificateIndex].File = Certificates.File;
        })
        setCertificates(draft => {
            draft.name = "";
            draft.description = "";
            draft.issueDate = "";
            draft.expiryDate = "";
            draft.approvedStatus = false;
            draft.File = null;
        })
        setChanges(true);
        CertificateEditModalClose();
    }

    useEffect(() => {
        if (CertificateIndex !== -1) {
            setCertificates(draft => {
                draft.name = DoctorData.certificates[CertificateIndex].name;
                draft.description = DoctorData.certificates[CertificateIndex].description;
                draft.issueDate = DoctorData.certificates[CertificateIndex].issueDate;
                draft.expiryDate = DoctorData.certificates[CertificateIndex].expiryDate;
                draft.approvedStatus = DoctorData.certificates[CertificateIndex].approvedStatus;
                draft.File = DoctorData.certificates[CertificateIndex].File;
            });
        }
    }, [CertificateIndex]);

    return (
        <Modal
            open={CertificateEditModal}
            onClose={CertificateEditModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className='model-container' style={{ width: 'fit-content' }}>
                <Typography variant="h4" style={{textAlign:'center', marginBottom:'20px'}}>Edit Certificate</Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                    value={Certificates.name}
                    onChange={(e) => {
                        setCertificates(draft => {
                            draft.name = e.target.value;
                        })
                    }} />
                <TextField id="outlined-basic" label="Description" variant="outlined"
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                    value={Certificates.description}
                    onChange={(e) => {
                        setCertificates(draft => {
                            draft.description = e.target.value;
                        })
                    }
                    } />
                <div className="row-display" style={{ gap: '30px', marginBottom: '20px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Issue Date"
                            defaultValue={dayjs(Certificates.issueDate)}
                            onChange={(newValue) => {
                                const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                                setCertificates(draft => {
                                    draft.issueDate = formattedDate;
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Expiry Date"
                            defaultValue={dayjs(Certificates.expiryDate)}
                            onChange={(newValue) => {
                                const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                                setCertificates(draft => {
                                    draft.expiryDate = formattedDate;
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                </div>
                <div className="row-display">
                    <input type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setCertificates(draft => {
                                draft.File = e.target.files[0];
                            })
                        }}
                        id="certificateInput"
                    />
                    <label htmlFor="certificateInput">
                        <Typography variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }} component="span">
                            Upload Certificate
                        </Typography>
                    </label>
                    {
                        Certificates.File !== null ? <Typography>{Certificates.File.name}</Typography> : null
                    }
                </div>
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px' }}
                        onClick={() => { HandleCertificateEditChange() }}
                    >
                        Edit Certificate
                    </Button>
                </Container>
            </Container>
        </Modal>
    );
}

export default EditCertificate;