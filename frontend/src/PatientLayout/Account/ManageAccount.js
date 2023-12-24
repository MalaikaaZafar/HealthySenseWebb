import { Avatar, Button, Container, Modal, Tab, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";


const ManageAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [PatientData, setPatientData] = useImmer({
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
        BloodType: "A+",
        Picture: null,
    });
    const [History, setHistory] = useImmer({
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
        BloodType: "A+",
        Picture: null,
    });
    const [Index, setIndex] = useState(-1);
    const [HistoryModal, setHistoryModal] = useState(false);
    const [HistoryEditModal, setHistoryEditModal] = useState(false);
    const [HistoryData, setHistoryData] = useImmer({
        Type: "",
        Description: "",
    });

    const HistoryModalClose = () => { setHistoryModal(false) };
    const HistoryModalOpen = () => { setHistoryModal(true) };

    const HistoryEditModalClose = () => { setHistoryEditModal(false) };
    const HistoryEditModalOpen = () => { setHistoryEditModal(true) };

    const EditHistory = (index) => {
        setHistoryData(draft => {
            draft.Type = PatientData.History[index].Type;
            draft.Description = PatientData.History[index].Description;
        })
        setIndex(index);
        HistoryEditModalOpen();
    }

    const AddHistory = () => {
        if (HistoryData.Type.trim() === "" || HistoryData.Description.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setPatientData(draft => {
            draft.History.push(HistoryData);
        })
        setHistoryData(draft => {
            draft.Type = "";
            draft.Description = "";
        })
        HistoryModalClose();
    }

    const HandleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPatientData(draft => {
                    draft.Picture = reader.result;
                })
            };
        }
    }

    const EditHistoryData = () => {
        if (HistoryData.Type.trim() === "" || HistoryData.Description.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setPatientData(draft => {
            draft.History[Index].Type = HistoryData.Type;
            draft.History[Index].Description = HistoryData.Description;
        })
        setHistoryData(draft => {
            draft.Type = "";
            draft.Description = "";
        })
        HistoryEditModalClose();
    }

    useEffect(() => {

    }, []);

    return (
        <Container>
            <Typography variant="h4">Manage Account</Typography>
            <Avatar sx={{ width: 100, height: 100 }} src={PatientData.Picture} />
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
            <TextField id="outlined-basic" label="Name" variant="outlined" value={PatientData.name} />
            <TextField id="outlined-basic" label="Age" variant="outlined" value={PatientData.Age} />
            <TextField id="outlined-basic" label="Address" variant="outlined" value={PatientData.Address} />
            <TextField id="outlined-basic" label="Phone" variant="outlined" value={PatientData.Phone} />
            <TextField id="outlined-basic" label="Email" variant="outlined" value={PatientData.Email} />
            <TextField id="outlined-basic" label="Blood Type" variant="outlined" value={PatientData.BloodType} />
            <Typography variant="h6">History</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {PatientData.History.length > 0 ? PatientData.History.map((history, index) => (
                    <TableRow>
                        <TableCell>{history.Type}</TableCell>
                        <TableCell>{history.Description}</TableCell>
                        <TableCell>
                            <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                                onClick={() => {
                                    EditHistory(index);
                                }}
                            >
                                Edit
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                                onClick={() => {
                                    setPatientData(draft => {
                                        draft.History.splice(index, 1);
                                    })
                                }}>
                                Delete</Button>
                        </TableCell>
                    </TableRow>
                )) : <TableRow><TableCell>No History</TableCell></TableRow>}
            </Table>
            <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                onClick={() => { HistoryModalOpen() }}
            >Add History</Button>
            <Modal
                open={HistoryModal}
                onClose={HistoryModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container className='model-container' style={{ width: 'fit-content' }}>
                    <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Add History</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Type"
                        variant="outlined"
                        onChange={(e) => { setHistoryData(draft => { draft.Type = e.target.value }) }}
                        style={{ width: '600px', marginBottom: '20px' }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={(e) => { setHistoryData(draft => { draft.Description = e.target.value }) }}
                        style={{ width: '600px', marginBottom: '20px' }}
                    />
                    <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                        <Button variant="contained"
                            style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                            onClick={AddHistory}
                        >
                            Add
                        </Button>
                    </Container>
                </Container>
            </Modal>
            <Modal
                open={HistoryEditModal}
                onClose={HistoryEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container className='model-container' style={{ width: 'fit-content' }}>
                    <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Edit History</Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Type"
                        variant="outlined"
                        value={HistoryData.Type}
                        onChange={(e) => { setHistoryData(draft => { draft.Type = e.target.value }) }}
                        style={{ width: '600px', marginBottom: '20px' }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={HistoryData.Description}
                        onChange={(e) => { setHistoryData(draft => { draft.Description = e.target.value }) }}
                        style={{ width: '600px', marginBottom: '20px' }}
                    />
                    <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                        <Button variant="contained"

                            style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                            onClick={EditHistoryData}
                        >
                            Edit
                        </Button>
                    </Container>
                </Container>
            </Modal>

            <Container style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '70px' }}>
                <Button variant="contained"
                    style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
                    onClick={() => {
                        setPatientData(draft => {
                            draft.name = History.name;
                            draft.Age = History.Age;
                            draft.Address = History.Address;
                            draft.Phone = History.Phone;
                            draft.Email = History.Email;
                            draft.History = History.History;
                            draft.BloodType = History.BloodType;
                        })
                    }}
                >
                    Cancel
                </Button>
                <Button variant="contained"
                    style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                    onClick={() => {
                    }}
                >
                    Save Changes
                </Button>
            </Container>
        </Container>
    )
}

export default ManageAccount;