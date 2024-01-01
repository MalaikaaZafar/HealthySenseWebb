import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";


const AddService = ({ setDoctorData, ServiceModal, ServiceModalClose, setChanges }) => {
    const [Service, setService] = useState("");

    const HandleServiceChange = () => {
        if (Service.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDoctorData(draft => {
            draft.services.push(Service);
        })
        setService("");
        setChanges(true);
        ServiceModalClose();
    }

    return (
        <Modal
            open={ServiceModal}
            onClose={ServiceModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className='model-container' style={{ width: 'fit-content' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>Add Service</Typography>
                <TextField id="outlined-basic" label="Service" variant="outlined" value={Service}
                    onChange={(e) => {
                        setService(e.target.value);
                    }}
                    style={{ width: '100%', minWidth: '600px', marginBottom: '20px' }}
                />
                <div className="row-display" style={{alignItems:'center', justifyContent:'right'}}>
                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}
                        onClick={() => { HandleServiceChange() }}
                    >
                        Add Service
                    </Button>
                </div>
            </Container>
        </Modal>
    );

}

export default AddService;