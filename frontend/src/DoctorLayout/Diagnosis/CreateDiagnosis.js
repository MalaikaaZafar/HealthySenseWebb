import React, { useState } from 'react'
import { useDiagnosis } from './DiagnosisPage';
import { Container, Typography, TextField, Button, Table, TableHead, TableCell, TableRow, TableBody, Modal, Tab } from '@mui/material';
import { useImmer } from 'use-immer';
import AddMedicine from './modals/AddMedicine';
import EditMedicine from './modals/EditMedicine';
import AddTest from './modals/AddTest';
import EditTest from './modals/EditTest';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const CreateDiagnosis = () => {
    const { Diagnosis, PageChange, setDiagnosis } = useDiagnosis();
    const [MedicineModal, setMedicineModal] = useState(false);
    const [TestModal, setTestModal] = useState(false);

    const [EditMedicineModal, setEditMedicine] = useState(false);
    const [MedicineIndex, setMedicineIndex] = useState(-1);
    const [EditTestModal, setEditTest] = useState(false);
    const [TestIndex, setTestIndex] = useState(-1);


    const EditMedicineModalClose = () => { setEditMedicine(false) };
    const EditMedicineModalOpen = () => {
        setMedicineIndex(-1);
        setEditMedicine(true)
    };

    const HandleEditMedicine = (index) => {
        setMedicineIndex(index);
        EditMedicineModalOpen();
    }


    const EditTestModalClose = () => { setEditTest(false) };
    const EditTestModalOpen = () => { setEditTest(true) };

    const HandleEditTest = (index) => {
        setTestIndex(index);
        EditTestModalOpen();
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
                    {Diagnosis.prescription.length > 0 ?
                                    Diagnosis.prescription.map((item, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.Name}</TableCell>
                                                <TableCell>{item.Dosage}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
                                                        onClick={() => HandleEditMedicine(index)}
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
                                    }) :
                                    <TableRow>
                                        <TableCell>No Medicines</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    <Button
                        style={{ backgroundColor: 'inherit', color: '#3f51b5', width: 'fit-content', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}
                        startIcon={<AddCircleOutline />}
                        onClick={MedicineModalOpen}
                    >
                        Add Medicine
                    </Button>
                    <AddMedicine
                        setDiagnosis={setDiagnosis}
                        MedicineModal={MedicineModal}
                        MedicineModalClose={MedicineModalClose}
                    />
                    <EditMedicine
                        setDiagnosis={setDiagnosis}
                        EditMedicineModal={EditMedicineModal}
                        EditMedicineModalClose={EditMedicineModalClose}
                        MedicineIndex={MedicineIndex}
                    />
                </div>
                <div className="column21">
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Tests: </Typography>
                    <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Test</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                    
                            <TableBody>
                                {Diagnosis.tests.length > 0 ?
                                    Diagnosis.tests.map((item, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item}</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginLeft: '10px' }}
                                                        onClick={() => HandleEditTest(index)}
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
                                    }):
                                    <TableRow>
                                        <TableCell>No Tests</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    <Button
                        style={{ backgroundColor: 'inherit', color: '#3f51b5', width: 'fit-content', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}
                        startIcon={<AddCircleOutline />}
                        onClick={TestModalOpen}
                    >
                        Add Test
                    </Button>
                    <AddTest
                        setDiagnosis={setDiagnosis}
                        TestModal={TestModal}
                        TestModalClose={TestModalClose}
                    />
                    <EditTest
                        Diagnosis={Diagnosis}
                        setDiagnosis={setDiagnosis}
                        EditTestModal={EditTestModal}
                        EditTestModalClose={EditTestModalClose}
                        TestIndex={TestIndex}
                    />
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