import React, { useState } from 'react'
import { useDiagnosis } from './DiagnosisPage';
import { Container, Typography, TextField, Button, Table, TableHead, TableCell, TableRow, TableBody, Modal } from '@mui/material';
import { useImmer } from 'use-immer';


const CreateDiagnosis = () => {
    const { Diagnosis, PageChange, setDiagnosis } = useDiagnosis();
    const [MedicineModal, setMedicineModal] = useState(false);
    const [TestModal, setTestModal] = useState(false);

    const [EditMedicineModal, setEditMedicine] = useState(false);
    const [MedicineIndex, setMedicineIndex] = useState(-1);
    const [EditTestModal, setEditTest] = useState(false);
    const [TestIndex, setTestIndex] = useState(-1);
    const [Medicine, setMedicine] = useImmer({
        Name: "",
        Dosage: "",
    });

    const [Test, setTest] = useImmer({
        Name: "",
    });

    const AddMedicine = () => {
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

    const AddTest = () => {
        if (Test.Name.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDiagnosis(draft => {
            draft.tests.push(Test);
        });
        setTest(draft => {
            draft.Name = "";
        });
        TestModalClose();
    }

    const EditMedicineModalClose = () => { setEditMedicine(false) };
    const EditMedicineModalOpen = () => { setEditMedicine(true) };

    const EditMedicine = (index) => {
        setMedicineIndex(index);
        setMedicine(draft => {
            draft.Name = Diagnosis.prescription[index].Name;
            draft.Dosage = Diagnosis.prescription[index].Dosage;
        });
        EditMedicineModalOpen();
    }
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

    const EditTestModalClose = () => { setEditTest(false) };
    const EditTestModalOpen = () => { setEditTest(true) };

    const EditTest = (index) => {
        setTestIndex(index);
        setTest(draft => {
            draft.Name = Diagnosis.tests[index].Name;
        });
        EditTestModalOpen();
    }

    const EditTests = () => {    
        if (Test.Name.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDiagnosis(draft => {
            draft.tests[TestIndex] = Test;
        });
        setTest(draft => {
            draft.Name = "";
        });
        EditTestModalClose();
    }




    const MedicineModalClose = () => { setMedicineModal(false) };
    const MedicineModalOpen = () => { setMedicineModal(true) };

    const TestModalClose = () => { setTestModal(false) };
    const TestModalOpen = () => { setTestModal(true) };

    return (
        <Container style={{ marginTop: '50px' }}>
            <Button variant="contained"
                style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}
                onClick={() => PageChange(1)}
            >
                Back
            </Button>
            <Typography variant="h4" style={{ textAlign: 'center' }}>Create Diagnosis</Typography>
            <Container className="Diagnosis-Diag">
                <div className="column21">
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue={Diagnosis.diagnosis}
                        label="Diagnosis"
                        variant="outlined"
                        onChange={(e) => setDiagnosis(draft => { draft.diagnosis = e.target.value })}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="column21">
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Prescription: </Typography>
                    {Diagnosis.prescription.length > 0 &&
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Medicine</TableCell>
                                    <TableCell>Dosage</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Diagnosis.prescription.map((item, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.Name}</TableCell>
                                                <TableCell>{item.Dosage}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
                                                        onClick={() => EditMedicine(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
                                                        onClick={() => {
                                                            setDiagnosis(draft => { draft.prescription.splice(index, 1); });
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                            </TableBody>
                        </Table>
                    }
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content' }}
                        onClick={MedicineModalOpen}
                    >
                        Add Medicine
                    </Button>
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
                                label="Dosage"
                                variant="outlined"
                                onChange={(e) => setMedicine(draft => { draft.Dosage = e.target.value })}
                                style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                            />
                            <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                                <Button variant="contained"
                                    style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px' }}
                                    onClick={AddMedicine}
                                >
                                    Add
                                </Button>
                            </Container>
                        </Container>
                    </Modal>
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
                </div>
                <div className="column21">
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Tests: </Typography>
                    {Diagnosis.tests.length > 0 &&
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Test</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Diagnosis.tests.map((item, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.Name}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
                                                        onClick={() => EditTest(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
                                                        onClick={() => {
                                                            setDiagnosis(draft => { draft.tests.splice(index, 1); });
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                            </TableBody>
                        </Table>
                    }
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content' }}
                        onClick={TestModalOpen}
                    >
                        Add Test
                    </Button>
                    <Modal
                        open={TestModal}
                        onClose={TestModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Container className='model-container' style={{ width: 'fit-content' }}>
                            <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Add Test</Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Test Name"
                                variant="outlined"
                                onChange={(e) => setTest(draft => { draft.Name = e.target.value })}
                                style={{ width: '600px', marginBottom: '20px' }}
                            />
                            <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                                <Button variant="contained"
                                    style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                                    onClick={AddTest}
                                >
                                    Add
                                </Button>
                            </Container>
                        </Container>
                    </Modal>
                    <Modal
                        open={EditTestModal}
                        onClose={EditTestModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Container className='model-container' style={{ width: 'fit-content' }}>
                            <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Edit Test</Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Test Name"
                                variant="outlined"
                                defaultValue={Test.Name}
                                onChange={(e) => setTest(draft => { draft.Name = e.target.value })}
                                style={{ width: '600px', marginBottom: '20px' }}
                            />
                            <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                                <Button variant="contained"
                                    style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                                    onClick={EditTests}
                                >
                                    Edit
                                </Button>
                            </Container>
                        </Container>
                    </Modal>
                </div>
                <div className="column21">
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue={Diagnosis.notes}
                        variant="outlined"
                        label="Notes"
                        onChange={(e) => setDiagnosis(draft => { draft.notes = e.target.value })}
                        style={{ width: '100%' }}
                    />
                </div>
            </Container>
            <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '70px' }}>
                <Button variant="contained"
                    style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                    onClick={() => PageChange(3)}
                >
                    Submit
                </Button>
            </Container>
        </Container>
    )

};

export default CreateDiagnosis;