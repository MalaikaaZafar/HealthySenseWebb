import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { Button, Container, Modal, TextField, Typography } from "@mui/material";

const EditHistory = ({ PatientData, setPatientData, HistoryEditModal, HistoryEditModalClose, setChanges, Index }) => {
    const [HistoryData, setHistoryData] = useImmer({
        type: "",
        description: "",
    });

    const EditHistoryData = (e) => {
        e.preventDefault();
        if (HistoryData.type.trim() === "" || HistoryData.description.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setPatientData(draft => {
            draft.history[Index].type = HistoryData.type;
            draft.history[Index].description = HistoryData.description;
        })
        setHistoryData(draft => {
            draft.type = "";
            draft.description = "";
        })
        setChanges(true);
        HistoryEditModalClose();
    }

    useEffect(() => {
        if(Index!==-1){
            setHistoryData(draft => {
                draft.type = PatientData.history[Index].type;
                draft.description = PatientData.history[Index].description;
            })
        }
    }, [Index]);

    return (
        <Modal
            open={HistoryEditModal}
            onClose={()=>HistoryEditModalClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className='model-container' style={{ width: 'fit-content' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '30px' }}>Edit History</Typography>
                <TextField
                    id="outlined-multiline-static"
                    label="Type"
                    variant="outlined"
                    value={HistoryData.type}
                    onChange={(e) => { setHistoryData(draft => { draft.type = e.target.value }) }}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={HistoryData.description}
                    onChange={(e) => { setHistoryData(draft => { draft.description = e.target.value }) }}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                    <Button variant="contained"

                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                        onClick={(e)=>EditHistoryData(e)}
                    >
                        Edit
                    </Button>
                </Container>
            </Container>
        </Modal>

    )

}

export default EditHistory