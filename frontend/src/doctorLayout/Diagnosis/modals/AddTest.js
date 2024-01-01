import { Avatar, Button, Container, FormControl, InputLabel, Modal, NativeSelect, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const AddTest = ({ setDiagnosis, TestModal, TestModalClose }) => {
    const [Test, setTest] = useState("");

    const HandleAddTest = () => {
        if (Test.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setDiagnosis(draft => {
            draft.tests.push(Test);
        });
        setTest("");
        TestModalClose();
    }

    return (
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
                    onChange={(e) => setTest(e.target.value)}
                    style={{ width: '600px', marginBottom: '20px' }}
                />
                <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                    <Button variant="contained"
                        style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '10px', width: 'fit-content', justifySelf: 'center' }}
                        onClick={HandleAddTest}
                    >
                        Add
                    </Button>
                </Container>
            </Container>
        </Modal>
    )

}

export default AddTest;