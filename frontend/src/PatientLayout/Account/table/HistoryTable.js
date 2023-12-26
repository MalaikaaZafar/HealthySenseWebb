import { Button, Container, Typography, } from "@mui/material";
import React from "react";

const PatientHistory = ({ PatientData, setPatientData, setIndex, HistoryEditModalOpen }) => {
    return (
        <Container style={{marginTop:'-30px', padding:'0px'}}>
            <Container style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '10px', marginBottom:'0px', borderBottom:'1px solid rgba(224, 224, 224, 1)', paddingBottom:'5px' }}>
                <Container style={{ width: '20%', textAlign: 'left', padding: '5px', margin: '0px' }}>
                    <Typography variant="h6" style={{ textAlign: 'left' }}>Type</Typography>
                </Container>
                <Container style={{ width: '50%', textAlign: 'left', padding: '5px' }}>
                    <Typography variant="h6" style={{ textAlign: 'left' }}>Description</Typography>
                </Container>
                <Container style={{ width: '30%', textAlign: 'left' }}>
                </Container>
            </Container>
            {
                PatientData.history.length > 0 ?
                    PatientData.history.map((history, index) => {
                        return (
                            <Container style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '10px', alignItems:'center', borderBottom:'1px solid rgba(224, 224, 224, 1)'}}>
                                <Container style={{ width: '20%', textAlign: 'left', padding: '5px', margin: '0px', overflowWrap:'break-word', wordBreak:'normal' }}>
                                    <Typography variant="p" style={{ textAlign: 'left' }}>{history.type}</Typography>
                                </Container>
                                <Container style={{ width: '60%', textAlign: 'left', padding: '5px', overflowWrap:'break-word', wordBreak:'normal' }}>
                                    <Typography variant="p" style={{ textAlign: 'left' }}>{history.description}</Typography>
                                </Container>
                                <Container style={{ width: '20%', display:'flex', flexDirection:'row', justifyContent:'space-around', padding:'5px', alignContent:'center' }}>
                                    <Button
                                        style={{ backgroundColor: '#3f51b5', color: 'white', width: 'fit-content', fontWeight: 'bold', fontSize: '16px' }}
                                        onClick={() => {
                                            setIndex(index);
                                            HistoryEditModalOpen();
                                        }}
                                        variant="contained"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        style={{ backgroundColor: '#3f51b5', color: 'white', width: 'fit-content', fontWeight: 'bold', fontSize: '16px' }}
                                        onClick={() => {
                                            setPatientData(draft => {
                                                draft.History.splice(index, 1);
                                            })
                                        }}
                                        variant="contained"
                                    >
                                        Delete
                                    </Button>
                                </Container>
                            </Container>
                        )
                    })
                    :
                    <Container style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>No History</Typography>
                    </Container>
            }
        </Container>
    );
}

export default PatientHistory;