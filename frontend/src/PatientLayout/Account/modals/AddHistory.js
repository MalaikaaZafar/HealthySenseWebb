import { Button, Container, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useImmer } from "use-immer";

const AddHistory = ({ setPatientData, HistoryModal, HistoryModalClose, setChanges }) => {
    const [HistoryData, setHistoryData] = useImmer({
        type: "",
        description: "",
    });

    const AddHistory = () => {
        if (HistoryData.type.trim() === "" || HistoryData.description.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setPatientData(draft => {
            draft.history.push(HistoryData);
        })
        setHistoryData(draft => {
            draft.type = "";
            draft.description = "";
        })
        setChanges(true);
        HistoryModalClose();
    }

    return (
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
                    onChange={(e) => { setHistoryData(draft => { draft.type = e.target.value }) }}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={(e) => { setHistoryData(draft => { draft.description = e.target.value }) }}
                    style={{ width: '100%', minWidth: '350px', marginBottom: '20px' }}
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
    );
}


export default AddHistory;