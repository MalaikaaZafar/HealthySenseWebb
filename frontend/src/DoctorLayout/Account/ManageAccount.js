import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


const ManageAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Changes, setChanges] = useState(false);
    const [DoctorData, setDoctorData] = useImmer({
        name: "John Doe",
        Age: 20,
        Address: "123, ABC Street, XYZ City",
        Phone: 1234567890,
        Email: "JohnDoe@Email",
        History: [
            {
                Type: "Diabetes",
                Description: "Since 2010",
            }
        ],
        Picture: null,
        specialization: "Cardiologist",
        description: "I am a cardiologist",
        location: "ABC Hospital",
        experience: 10,
        workingHours: "10:00 AM - 6:00 PM",
        fee: 500,
        availability: true,
        certificates: [
            {
                name: "Certificate 1",
                description: "Certificate 1 Description",
                issueDate: "2021-10-10",
                expiryDate: "2021-10-10",
                approvedStatus: true,
                File: null,
            },
        ],
    });
    const [History, setHistory] = useImmer({

    });
    const [Certificates, setCertificates] = useImmer({
        name: "",
        description: "",
        issueDate: "",
        expiryDate: "",
        approvedStatus: false,
        File: null,
    });

    const [CertificateModal, setCertificateModal] = useState(false);

    const CertificateModalOpen = () => { setCertificateModal(true); };
    const CertificateModalClose = () => { setCertificateModal(false); };

    const [CertificateEditModal, setCertificateEditModal] = useState(false);
    const [CertificateEditIndex, setCertificateEditIndex] = useState(-1);

    const CertificateEditModalOpen = () => { setCertificateEditModal(true); };
    const CertificateEditModalClose = () => { setCertificateEditModal(false); };

    const HandleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setDoctorData(draft => {
                    draft.Picture = reader.result;
                })
            };
            setChanges(true);
        }
    }

    const HandleCertificateChange = () => {
        if (Certificates.name.trim() === "" || Certificates.description.trim() === "" || Certificates.issueDate === "" || Certificates.expiryDate === "" || Certificates.File === null) {
            alert("Please fill all the fields");
            return;
        }
        const CheckIssueDate=Certificates.issueDate.split("-");
        const CheckExpiryDate=Certificates.expiryDate.split("-");
        if(CheckIssueDate[0]>CheckExpiryDate[0]){
            alert("Issue Date cannot be greater than Expiry Date");
            return;
        }
        else if(CheckIssueDate[0]===CheckExpiryDate[0]){
            if(CheckIssueDate[1]>CheckExpiryDate[1]){
                alert("Issue Date cannot be greater than Expiry Date");
                return;
            }
            else if(CheckIssueDate[1]===CheckExpiryDate[1]){
                if(CheckIssueDate[2]>=CheckExpiryDate[2]){
                    alert("Issue Date cannot be greater than or Equal to Expiry Date");
                    return;
                }
            }
        }
        setDoctorData(draft => {
            draft.certificates.push(Certificates);
        })
        setCertificates(draft => {
            draft.name = "";
            draft.description = "";
            draft.issueDate = "";
            draft.expiryDate = "";
            draft.approvedStatus = false;
            draft.File = null;
        })
        CertificateModalClose();
    }

    const HandleCertificateEdit = (index) => {
        setCertificateEditIndex(index);
        setCertificates(draft => {
            draft.name = DoctorData.certificates[index].name;
            draft.description = DoctorData.certificates[index].description;
            draft.issueDate = DoctorData.certificates[index].issueDate;
            draft.expiryDate = DoctorData.certificates[index].expiryDate;
            draft.approvedStatus = DoctorData.certificates[index].approvedStatus;
            draft.File = DoctorData.certificates[index].File;
        })
        CertificateEditModalOpen();
    }

    const HandleCertificateEditChange = () => {
        if (Certificates.name.trim() === "" || Certificates.description.trim() === "" || Certificates.issueDate === "" || Certificates.expiryDate === "" || Certificates.File === null) {
            alert("Please fill all the fields");
            return;
        }
        const CheckIssueDate=Certificates.issueDate.split("-");
        const CheckExpiryDate=Certificates.expiryDate.split("-");
        if(CheckIssueDate[0]>CheckExpiryDate[0]){
            alert("Issue Date cannot be greater than Expiry Date");
            return;
        }
        else if(CheckIssueDate[0]===CheckExpiryDate[0]){
            if(CheckIssueDate[1]>CheckExpiryDate[1]){
                alert("Issue Date cannot be greater than Expiry Date");
                return;
            }
            else if(CheckIssueDate[1]===CheckExpiryDate[1]){
                if(CheckIssueDate[2]>=CheckExpiryDate[2]){
                    alert("Issue Date cannot be greater than or Equal to Expiry Date");
                    return;
                }
            }
        }
        setDoctorData(draft => {
            draft.certificates[CertificateEditIndex].name = Certificates.name;
            draft.certificates[CertificateEditIndex].description = Certificates.description;
            draft.certificates[CertificateEditIndex].issueDate = Certificates.issueDate;
            draft.certificates[CertificateEditIndex].expiryDate = Certificates.expiryDate;
            draft.certificates[CertificateEditIndex].approvedStatus = Certificates.approvedStatus;
            draft.certificates[CertificateEditIndex].File = Certificates.File;
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

    }, []);

    return (
        <Container style={{ marginBottom: '70px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="column211">
                <Typography style={{ textAlign: 'center' }} variant="h4">Manage Account</Typography>
                <div className="column123">
                    <Avatar sx={{ width: 100, height: 100 }} src={DoctorData.Picture} />
                    <div className="row-display">
                        <input type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => { HandleProfilePicChange(e) }}
                            id="profilePictureInput"
                        />
                        <label htmlFor="profilePictureInput">
                            <Typography variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }} component="span">
                                Change Profile Picture
                            </Typography>
                        </label>
                    </div>
                </div>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={DoctorData.name} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.name = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Age" variant="outlined" value={DoctorData.Age} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.Age = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Address" variant="outlined" value={DoctorData.Address} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.Address = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Phone" variant="outlined" value={DoctorData.Phone} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.Phone = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={DoctorData.Email} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.Email = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Specialization" variant="outlined" value={DoctorData.specialization} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.specialization = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Description" variant="outlined" value={DoctorData.description} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.description = e.target.value;
                    })
                    setChanges(true);
                }} />
                <TextField id="outlined-basic" label="Location" variant="outlined" value={DoctorData.location} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.location = e.target.value;
                    })
                    setChanges(true);
                }
                } />
                <TextField id="outlined-basic" label="Experience" variant="outlined" value={DoctorData.experience} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.experience = e.target.value;
                    })
                    setChanges(true);
                }
                } />
                <TextField id="outlined-basic" label="Working Hours" variant="outlined" value={DoctorData.workingHours} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.workingHours = e.target.value;
                    })
                    setChanges(true);
                }
                } />
                <TextField id="outlined-basic" label="Fee" variant="outlined" value={DoctorData.fee} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.fee = e.target.value;
                    })
                    setChanges(true);
                }
                } />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="uncontrolled-native">Availability</InputLabel>
                    <NativeSelect
                        value={DoctorData.availability}
                        onChange={(e) => {
                            setDoctorData(draft => {
                                draft.availability = e.target.value;
                            })
                            setChanges(true);
                        }}
                        inputProps={{
                            name: 'availability',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </NativeSelect>
                </FormControl>
                <Typography variant="h6">Certificates</Typography>
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
                                            onClick={()=>{
                                                setDoctorData(draft=>{
                                                    draft.certificates.splice(index,1);
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
                <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px', width: 'fit-content' }}
                    onClick={() => { CertificateModalOpen() }}
                >
                    Add Certificate
                </Button>
            </div>
            <Modal
                open={CertificateModal}
                onClose={CertificateModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container className='model-container' style={{ width: 'fit-content' }}>
                    <Typography variant="h4">Add Certificate</Typography>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                        style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                        value={Certificates.name} onChange={(e) => {
                            setCertificates(draft => {
                                draft.name = e.target.value;
                            })
                        }} />
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                        style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                        value={Certificates.description} onChange={(e) => {
                            setCertificates(draft => {
                                draft.description = e.target.value;
                            })
                        }
                        } />
                    <div className="row-display">
                        <div className="row-display" style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}>
                            <Typography>Issue Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                                        setCertificates(draft => {
                                            draft.issueDate = formattedDate;
                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="row-display" style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}>
                            <Typography>Expiry Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                                        setCertificates(draft => {
                                            draft.expiryDate = formattedDate;
                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
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
                            onClick={() => { HandleCertificateChange() }}
                        >
                            Add Certificate
                        </Button>
                    </Container>
                </Container>
            </Modal>

            <Modal
                open={CertificateEditModal}
                onClose={CertificateEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container className='model-container' style={{ width: 'fit-content' }}>
                    <Typography variant="h4">Edit Certificate</Typography>
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
                    <div className="row-display">
                        <div className="row-display" style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}>
                            <Typography>Issue Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    defaultValue={dayjs(Certificates.issueDate)}
                                    onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                                        setCertificates(draft => {
                                            draft.issueDate = formattedDate;
                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="row-display" style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}>
                            <Typography>Expiry Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    defaultValue={dayjs(Certificates.expiryDate)}
                                    onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                                        setCertificates(draft => {
                                            draft.expiryDate = formattedDate;
                                        })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
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
            <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="contained"
                    style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
                    onClick={() => {
                        setChanges(false);
                    }}
                >
                    Cancel
                </Button>
                <Button variant="contained"
                    style={{ backgroundColor: Changes ? '#3f51b5' : 'grey', color: 'white', marginTop: '20px' }}
                    onClick={() => {
                        setChanges(false);
                    }}
                    disabled={!Changes}
                >
                    Save Changes
                </Button>
            </Container>
        </Container>
    )
}

export default ManageAccount;