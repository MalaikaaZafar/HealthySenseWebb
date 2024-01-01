import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from 'use-immer';

const AddMedicine = ({ setDiagnosis, MedicineModal, MedicineModalClose }) => {
    const [Medicine, setMedicine] = useImmer({
        Name: "",
        Dosage: "",
    });

    const HandleAddMedicine = () => {
        if (Medicine.Name.trim() === "" || Medicine.Dosage.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDiagnosis(draft => {
            draft.prescription.push(Medicine);
        });
        setMedicine(draft => {
            draft.Name = "";
            draft.Dosage = "";
        });
        MedicineModalClose();
    }

    return (
        <Modal
            open={MedicineModal}
            onClose={MedicineModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className='model-container' style={{ width: 'fit-content' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Add Medicine</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Medicine Name"
                    variant="outlined"
                    onChange={(e) => setMedicine(draft => { draft.Name = e.target.value })}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    label="Dosage & Duration"
                    variant="outlined"
                    onChange={(e) => setMedicine(draft => { draft.Dosage = e.target.value })}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px' }}
                        onClick={HandleAddMedicine}
                    >
                        Add
                    </Button>
                </Container>
            </Container>
        </Modal>
    );
}

export default AddMedicine;