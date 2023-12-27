import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import AddHistory from "./modals/AddHistory";
import EditHistory from "./modals/EditHistory";
import LoadingAnimation from "../../components/loader/LoadingAnimation";
import PatientHistory from "./table/HistoryTable";
import PatientBloodGroup from "./dropdown/BloodGroup";
import AccountDetails from "../../components/user/Account/AccountDetails";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import axios from "axios";


const PatientManageAccount = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [Changes, setChanges] = useState(false);
    const [PatientData, setPatientData] = useImmer({});
    const [History, setHistory] = useImmer({});
    const [ImageUrl, setImageUrl] = useState(null);

    const [Index, setIndex] = useState(-1);
    const [HistoryModal, setHistoryModal] = useState(false);
    const [HistoryEditModal, setHistoryEditModal] = useState(false);

    const HistoryModalClose = () => { setHistoryModal(false) };
    const HistoryModalOpen = () => { setHistoryModal(true) };
    const HistoryEditModalClose = () => {
        setIndex(-1);
        setHistoryEditModal(false)
    };
    const HistoryEditModalOpen = () => { setHistoryEditModal(true) };

    const fetchPatientData = async () => {
        const id = "6585484c797f80875a8a769f";
        try {
            const response = await axios.get(`http://localhost:5000/patient/account/${id}`);
            const data = response.data;
            console.log(data);
            data.user.dob = data.user.dob.slice(0, 10);
            setIsLoading(false);
            setPatientData(data);
            setHistory(data);
        } catch (error) {
            console.log(error);
        }
    }

    const SaveData = async (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append('name', PatientData.user.name);
        form_data.append('email', PatientData.user.email);
        console.log(PatientData.history);
        form_data.append('history', JSON.stringify(PatientData.history));
        form_data.append('gender', PatientData.user.gender)
        form_data.append('phoneNumber', PatientData.user.phoneNumber);
        form_data.append('dob', PatientData.user.dob);
        form_data.append('bloodGroup', PatientData.bloodGroup);
        form_data.append('country', PatientData.user.country);
        form_data.append('profile', ImageUrl);
        console.log(form_data);
        try {
            const response = await axios.post(`http://localhost:5000/patient/update/${PatientData._id}`, form_data);
            const data = response.data;
            console.log(data);
            setHistory(PatientData)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPatientData();
    }, []);

    return (
        <>
            <LoadingAnimation isVisible={isLoading} />
            {
                isLoading ? null :
                    <Container style={{ marginBottom: '70px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="column211">
                            <AccountDetails
                                Data={PatientData.user}
                                setData={setPatientData}
                                setChanges={setChanges}
                                ImageUrl={ImageUrl}
                                setImageUrl={setImageUrl}
                            />

                            <PatientBloodGroup
                                PatientData={PatientData}
                                setPatientData={setPatientData}
                                setChanges={setChanges}
                            />

                            <Typography variant="h6">History</Typography>
                            <PatientHistory
                                PatientData={PatientData}
                                setPatientData={setPatientData}
                                setIndex={setIndex}
                                HistoryEditModalOpen={HistoryEditModalOpen}
                                setChanges={setChanges}
                            />
                            <Button
                                style={{ backgroundColor: 'inherit', color: '#3f51b5', width: 'fit-content', fontWeight: 'bold', fontSize: '16px', marginTop: '-10px' }}
                                startIcon={<AddCircleOutline />}
                                onClick={HistoryModalOpen}
                            >
                                Add History
                            </Button>
                        </div>

                        <AddHistory
                            setPatientData={setPatientData}
                            HistoryModal={HistoryModal}
                            HistoryModalClose={HistoryModalClose}
                            setChanges={setChanges}
                        />
                        <EditHistory
                            PatientData={PatientData}
                            setPatientData={setPatientData}
                            HistoryEditModal={HistoryEditModal}
                            HistoryEditModalClose={HistoryEditModalClose}
                            setChanges={setChanges}
                            Index={Index}
                        />

                        <Container style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '70px' }}>
                            <Button variant="contained"
                                style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
                                onClick={() => {
                                    setPatientData(draft => {
                                        draft.user = History.user;
                                        draft.bloodGroup = History.bloodGroup;
                                        draft.history = History.history;
                                    })
                                    setChanges(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained"
                                style={{ backgroundColor: Changes ? '#3f51b5' : 'grey', color: 'white', marginTop: '20px' }}
                                onClick={(e) => {
                                    SaveData(e);
                                    setChanges(false);
                                }}
                                disabled={!Changes}
                            >
                                Save Changes
                            </Button>
                        </Container>
                    </Container>
            }
        </>
    )
}

export default PatientManageAccount;