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


const PatientManageAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Changes, setChanges] = useState(true);
    const [PatientData, setPatientData] = useImmer({
        name: "John Doe",
        dob: "2003-02-11",
        country: "123, ABC Street, XYZ City",
        phoneNumber: 1234567890,
        email: "JohnDoe@Email",
        gender:'Male',
        history: [
            {
                type: "Diabetes",
                description: "Since 2010",
            }
        ],
        bloodGroup: "A+",
        profilePicture: null,
    });
    const [History, setHistory] = useImmer({
        name: "John Doe",
        dob: "2003-02-11",
        country: "123, ABC Street, XYZ City",
        phoneNumber: 1234567890,
        email: "JohnDoe@Email",
        gender:'Male',
        history: [
            {
                type: "Diabetes",
                description: "Since 2010",
            }
        ],
        bloodGroup: "A+",
        profilePicture: null,
    });
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

    useEffect(() => {

    }, []);

    return (
        <>
            <LoadingAnimation isVisible={isLoading} />
            {
                isLoading ? null :
                    <Container style={{ marginBottom: '70px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="column211">
                            <AccountDetails
                                Data={PatientData}
                                setData={setPatientData}
                                setChanges={setChanges}
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
                            />
                            <Button 
                                style={{ backgroundColor: 'inherit', color: '#3f51b5', width:'fit-content', fontWeight:'bold', fontSize:'16px', marginTop:'-10px' }} 
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
                                        draft.name = History.name;
                                        draft.dob = History.dob;
                                        draft.country = History.country;
                                        draft.phoneNumber = History.phoneNumber;
                                        draft.email = History.email;
                                        draft.profilePicture = History.profilePicture;
                                        draft.bloodGroup = History.bloodGroup;
                                        draft.history = History.history;
                                        draft.gender=History.gender;
                                    })
                                    setChanges(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained"
                                style={{ backgroundColor: Changes ? '#3f51b5' : 'grey', color: 'white', marginTop: '20px' }}
                                onClick={() => {
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