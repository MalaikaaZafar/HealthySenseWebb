import React, { useState } from 'react'
import { useDiagnosis } from './DiagnosisPage';
import { Container, Typography, TextField, Button, Table, TableHead, TableCell, TableRow, TableBody, Modal, Tab } from '@mui/material';
import AddMedicine from './modals/AddMedicine';
import EditMedicine from './modals/EditMedicine';
import AddTest from './modals/AddTest';
import EditTest from './modals/EditTest';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Box, styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import "@fontsource/roboto";

const CustomTableRow = styled(TableRow)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    width: '100%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
}));

const CustomTableCell = styled(TableCell)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    width: '100%',
    border: 'none',
    gap: '10px'
}));



const CreateDiagnosis = () => {
    const { AppointmentData, Diagnosis, PageChange, setDiagnosis } = useDiagnosis();
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


    const EditTestModalClose = () => {
        setTestIndex(-1);
        setEditTest(false) };
    const EditTestModalOpen = () => { 
        setEditTest(true) 
    };

    const HandleEditTest = (index) => {
        setTestIndex(index);
        EditTestModalOpen();
    }

    const MedicineModalClose = () => { setMedicineModal(false) };
    const MedicineModalOpen = () => { setMedicineModal(true) };

    const TestModalClose = () => { setTestModal(false) };
    const TestModalOpen = () => { setTestModal(true) };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#f5f5f5',
                py: 3
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                    py: 3,
                }}
            >
                <Button variant="contained"
                    style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}
                    onClick={() => PageChange(1)}
                >
                    Back
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        marginTop: '-20px',
                    }}
                >
                    <Typography variant="h4" style={{ textAlign: 'center' }}>Create Diagnosis</Typography>
                </Box>
                <Container className="Diagnosis-Diag">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            height: '100%',
                            py: 3,
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            borderTop: '1px solid rgba(224, 224, 224, 1)',
                        }}
                    >
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Patient Problem: </Typography>
                        <Typography variant="h6" style={{ color: 'GrayText', fontWeight: 'bold' }}>{AppointmentData.problem}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'left',
                            width: '100%',
                            height: '100%',
                            py: 4,
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        }}
                    >
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
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            py: 2,
                            gap: '10px',
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        }}
                    >
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Prescription: </Typography>
                        <Table
                            sx={{
                                border: '1px solid rgba(100, 100, 100, 0.5)',
                            }}
                        >
                            <TableHead>
                                <CustomTableRow>
                                    <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '25%' }}>Medicine</CustomTableCell>
                                    <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '55%' }}>Dosage & Duration</CustomTableCell>
                                    <CustomTableCell style={{ width: '20%' }}></CustomTableCell>
                                </CustomTableRow>
                            </TableHead>
                            <TableBody>
                                {Diagnosis.prescription.length > 0 ?
                                    Diagnosis.prescription.map((item, index) => {
                                        return (
                                            <CustomTableRow
                                                key={index}
                                            >
                                                <CustomTableCell style={{ width: '25%' }}>{item.Name}</CustomTableCell>
                                                <CustomTableCell style={{ width: '55%' }}>{item.Dosage}</CustomTableCell>
                                                <CustomTableCell style={{ width: '20%' }}>
                                                    <Container
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    >
                                                        <Button variant="contained" style={{ color: 'white', marginLeft: '10px' }}
                                                            onClick={() => HandleEditMedicine(index)}
                                                            color='success'
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button variant="contained" style={{ color: 'white', marginLeft: '10px' }}
                                                            onClick={() => {
                                                                setDiagnosis(draft => { draft.prescription.splice(index, 1); });
                                                            }}
                                                            color='error'
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Container>
                                                </CustomTableCell>
                                            </CustomTableRow>
                                        )
                                    }) :
                                    <CustomTableRow>
                                        <CustomTableCell>No Medicines</CustomTableCell>
                                    </CustomTableRow>
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
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            py: 2,
                            gap: '10px',
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        }}
                    >
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Tests: </Typography>
                        <Table
                            sx={{
                                border: '1px solid rgba(100, 100, 100, 0.5)',
                            }}
                        >
                            <TableHead>
                                <CustomTableRow>
                                    <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '80%' }}>Test</CustomTableCell>
                                    <CustomTableCell style={{ width: '20%' }}></CustomTableCell>
                                </CustomTableRow>
                            </TableHead>
                            <TableBody>
                                {Diagnosis.tests.length > 0 ?
                                    Diagnosis.tests.map((item, index) => {
                                        return (
                                            <CustomTableRow>
                                                <CustomTableCell style={{ width: '80%' }}>{item}</CustomTableCell>
                                                <CustomTableCell style={{ width: '20%' }}>
                                                    <Container
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    >
                                                        <Button variant="contained" style={{ color: 'white', marginLeft: '10px' }}
                                                            onClick={() => HandleEditTest(index)}
                                                            color='success'
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button variant="contained" style={{ color: 'white', marginLeft: '10px' }}
                                                            onClick={() => {
                                                                setDiagnosis(draft => { draft.tests.splice(index, 1); });
                                                            }}
                                                            color='error'
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Container>
                                                </CustomTableCell>
                                            </CustomTableRow>
                                        )
                                    }) :
                                    <CustomTableRow>
                                        <CustomTableCell>No Tests</CustomTableCell>
                                    </CustomTableRow>
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
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'left',
                            width: '100%',
                            height: '100%',
                            py: 4,
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        }}
                    >
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
                    </Box>
                </Container>
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '70px' }}>
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                        onClick={() => PageChange(2)}
                    >
                        Submit Diagnosis
                    </Button>
                </Container>
            </Container>
        </Box>
    )

};

export default CreateDiagnosis;