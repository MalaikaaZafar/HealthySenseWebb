import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";


const EditService = ({ DoctorData, setDoctorData, ServicesEditModal, ServiceModalClose, setChanges, ServiceIndex }) => {
    const [Service, setService] = useState("");

    const HandleServiceChange = () => {
        if (Service.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDoctorData(draft => {
            draft.services[ServiceIndex] = Service;
        })
        setService("");
        setChanges(true);
        ServiceModalClose();
    }


    useEffect(() => {
        if (ServiceIndex !== -1) {
            setService(DoctorData.services[ServiceIndex]);
        }
    }, [ServiceIndex])

    return (
        <Modal
            open={ServicesEditModal}
            onClose={ServiceModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className='model-container' style={{ width: 'fit-content' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Service</Typography>
                <TextField id="outlined-basic" label="Service" variant="outlined" value={Service}
                    onChange={(e) => {
                        setService(e.target.value);
                    }}
                    style={{ width: '100%', minWidth: '600px', marginBottom: '20px' }}
                />
                <div className="row-display" style={{ alignItems: 'center', justifyContent: 'right' }}>
                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}
                        onClick={() => { HandleServiceChange() }}
                    >
                        Edit Service
                    </Button>
                </div>
            </Container>
        </Modal>

    );

}

export default EditService;