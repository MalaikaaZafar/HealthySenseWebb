import { Button, Container, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import AddHistory from "./modals/AddHistory";
import EditHistory from "./modals/EditHistory";
import LoadingAnimation from "../../components/Loader/LoadingAnimation";
import PatientHistory from "./table/HistoryTable";
import PatientBloodGroup from "./dropdown/BloodGroup";
import AccountDetails from "../../components/user/Account/AccountDetails";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import getAccountDetails from "../../services/patient/account/getAccountDetails";
import saveAccountChanges from "../../services/patient/account/saveAccountChanges";
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import { useNavigate, useParams } from "react-router-dom";


const PatientManageAccount = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [Changes, setChanges] = useState(false);
    const [PatientData, setPatientData] = useImmer({});
    const [History, setHistory] = useImmer({});
    const [ImageUrl, setImageUrl] = useState(null);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");

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


    const SaveData = async (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append('name', PatientData.user.name);
        form_data.append('email', PatientData.user.email);
        form_data.append('history', JSON.stringify(PatientData.history));
        form_data.append('gender', PatientData.user.gender)
        form_data.append('phoneNumber', "+92" + PatientData.user.phoneNumber);
        form_data.append('dob', PatientData.user.dob);
        form_data.append('bloodGroup', PatientData.bloodGroup);
        form_data.append('country', PatientData.user.country);
        form_data.append('profile', ImageUrl);
        if (await saveAccountChanges(id, form_data)) {
            setHistory(PatientData);
            setChanges(false);
            setMsg("Changes Saved Successfully");
            setSeverity("success");
            setOpen(true);
        }
        else {
            setMsg("Error Occured");
            setSeverity("error");
            setOpen(true);
        }
    }

    const fetchData = async () => {
        const data = await getAccountDetails(id);
        if (data !== null) {
            console.log("Data");
            console.log(data);
            setPatientData(data);
            setHistory(data);
            setIsLoading(false);
        }
        else {
            setMsg("Sorry Failed to Retrieve Data");
            setSeverity('error')
            setOpen(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <LoadingAnimation isVisible={isLoading} />
            {
                isLoading ? null :
                    <Container style={{
                        marginBottom: '70px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        marginTop: '30px',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                        marginBottom: '30px'
                    }}
                    >
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

                            <Typography variant="h6"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontWeight: 'bold'
                                }}
                            >
                                <MedicalServicesRoundedIcon />
                                History
                            </Typography>
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

                        <Container style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                            <Button variant="contained"
                                style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
                                onClick={() => {
                                    setPatientData(draft => {
                                        draft.user = History.user;
                                        draft.bloodGroup = History.bloodGroup;
                                        draft.history = History.history;
                                    })
                                    setImageUrl(null);
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
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default PatientManageAccount;