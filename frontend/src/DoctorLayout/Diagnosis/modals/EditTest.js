import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const EditTest = ({ Diagnosis, setDiagnosis, EditTestModal, EditTestModalClose, TestIndex }) => {
    const [Test, setTest] = useState("");

    const HandleEditTests = () => {
        if (Test.Name.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDiagnosis(draft => {
            draft.tests[TestIndex] = Test;
        });
        setTest("");
        EditTestModalClose();
    }

    useEffect(() => {
        if (TestIndex !== -1) {
            setTest(Diagnosis.tests[TestIndex]);
        }
    }, []);

    return (
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
                    defaultValue={Test}
                    onChange={(e) => setTest(e.target.value)}
                    style={{ width: '600px', marginBottom: '20px' }}
                />
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                        onClick={HandleEditTests}
                    >
                        Edit
                    </Button>
                </Container>
            </Container>
        </Modal>
    );

}

export default EditTest;