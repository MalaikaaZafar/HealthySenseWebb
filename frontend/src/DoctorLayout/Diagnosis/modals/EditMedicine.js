import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from 'use-immer';

const EditMedicine = ({ Diagnosis, setDiagnosis, EditMedicineModal, EditMedicineModalClose, MedicineIndex }) => {
    const [Medicine, setMedicine] = useImmer({
        Name: "",
        Dosage: "",
    });

    const EditPrescription = () => {
        if (Medicine.Name.trim() === "" || Medicine.Dosage.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDiagnosis(draft => {
            draft.prescription[MedicineIndex] = Medicine;
        });
        setMedicine(draft => {
            draft.Name = "";
            draft.Dosage = "";
        });
        EditMedicineModalClose();
    }

    useEffect(() => {
        if (MedicineIndex !== -1) {
            setMedicine(draft => {
                draft.Name = Diagnosis.prescription[MedicineIndex].Name;
                draft.Dosage = Diagnosis.prescription[MedicineIndex].Dosage;
            })
        }
    }, []);

    return (
        <Modal
            open={EditMedicineModal}
            onClose={EditMedicineModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className='model-container' style={{ width: 'fit-content' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Edit Medicine</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Medicine Name"
                    variant="outlined"
                    defaultValue={Medicine.Name}
                    onChange={(e) => setMedicine(draft => { draft.Name = e.target.value })}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    label="Dosage"
                    variant="outlined"
                    defaultValue={Medicine.Dosage}
                    onChange={(e) => setMedicine(draft => { draft.Dosage = e.target.value })}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px' }}
                        onClick={EditPrescription}
                    >
                        Edit
                    </Button>
                </Container>
            </Container>
        </Modal>
    )
}

export default EditMedicine;