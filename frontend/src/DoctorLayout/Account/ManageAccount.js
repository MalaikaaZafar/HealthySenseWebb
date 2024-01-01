import { Button, Container, Snackbar, Typography, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AccountDetails from "../../components/user/Account/AccountDetails";
import DoctorSpecializedDetails from "./DoctorSpecialized";
import CertificateTable from "./tables/CertificateTable";
import AddCertificate from "./modals/certificate/AddCertificate";
import EditCertificate from "./modals/certificate/EditCertificate";
import AddService from "./modals/services/AddService";
import EditService from "./modals/services/EditService";
import DoctorServices from "./tables/ServiceTable";
import LoadingAnimation from "../../components/loader/LoadingAnimation";
import getAccountDetails from "../../services/doctor/account/getAccountDetails";
import { useNavigate, useParams } from "react-router-dom";
import saveAccountChanges from "../../services/doctor/account/saveAccountChanges";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const DoctorManageAccount = () => {
    const ID = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [Changes, setChanges] = useState(false);
    const [ImageUrl, setImageUrl] = useState(null);
    const [Files, setFiles] = useImmer([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    const [DoctorData, setDoctorData] = useImmer({
        user: {
            _id: "",
            name: "John Doe",
            dob: "2003-02-11",
            country: "123, ABC Street, XYZ City",
            phoneNumber: 1234567890,
            email: "JohnDoe@Email",
            gender: 'Male',
            profilePicture: null,
        },
        specialization: "Cardiologist",
        description: "I am a cardiologist",
        location: "ABC Hospital",
        experience: 10,
        workingHours: "10:00 AM - 6:00 PM",
        availability: true,
        session: [
            {
                type: "Online",
                fee: 500,
            },
            {
                type: "Clinic",
                fee: 500,
            },
        ],
        certificates: [
            {
                name: "Certificate 1",
                description: "Certificate 1 Description",
                issueDate: "2021-10-10",
                expiryDate: "2021-10-10",
                approvedStatus: true,
                File: null,
            },
        ],
        services: [
            "Service 1",
            "Service 2",
            "Service 3"
        ],
    });

    const [History, setHistory] = useImmer({});

    const [CertificateModal, setCertificateModal] = useState(false);

    const CertificateModalOpen = () => { setCertificateModal(true); };
    const CertificateModalClose = () => { setCertificateModal(false); };

    const [CertificateEditModal, setCertificateEditModal] = useState(false);
    const [CertificateEditIndex, setCertificateEditIndex] = useState(-1);

    const CertificateEditModalOpen = () => { setCertificateEditModal(true); };
    const CertificateEditModalClose = () => {
        setCertificateEditIndex(-1);
        setCertificateEditModal(false);
    };

    const [ServicesModal, setServicesModal] = useState(false);

    const ServicesModalOpen = () => { setServicesModal(true); };
    const ServicesModalClose = () => { setServicesModal(false); };

    const [ServicesEditModal, setServicesEditModal] = useState(false);
    const [ServicesEditIndex, setServicesEditIndex] = useState(-1);

    const ServicesEditModalOpen = () => {
        setServicesEditModal(true);
    };
    const ServicesEditModalClose = () => {
        setServicesEditIndex(-1);
        setServicesEditModal(false);
    };


    const HandleCertificateEdit = (index) => {
        setCertificateEditIndex(index);
        CertificateEditModalOpen();
    }

    const HandleServicesEdit = (index) => {
        setServicesEditIndex(index);
        ServicesEditModalOpen();
    }

    const SaveChanges = async () => {
        const form_data = new FormData();
        form_data.append("user", JSON.stringify(DoctorData.user));
        form_data.append("phoneNumber", "+92" + DoctorData.user.phoneNumber);
        form_data.append("specialization", DoctorData.specialization);
        form_data.append("description", DoctorData.description);
        form_data.append("location", DoctorData.location);
        form_data.append("experience", DoctorData.experience);
        form_data.append("workingHours", DoctorData.workingHours);
        form_data.append("availability", DoctorData.availability);
        form_data.append("session", JSON.stringify(DoctorData.session));
        form_data.append("certificates", JSON.stringify(DoctorData.certificates));
        form_data.append("services", JSON.stringify(DoctorData.services));
        form_data.append("profile", ImageUrl);
        for (let i = 0; i < Files.length; i++) {
            form_data.append(`${Files[i].name}`, Files[i].file);
        }
        if (await saveAccountChanges(ID, form_data)) {
            setHistory(DoctorData);
            setChanges(false);
            setFiles([]);
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
        const data = await getAccountDetails(ID);
        if (data) {
            setDoctorData(data);
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
                        marginBottom: '30px',
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
                    }}>
                        <div className="column211">
                            <AccountDetails
                                Data={DoctorData.user}
                                setData={setDoctorData}
                                setChanges={setChanges}
                                ImageUrl={ImageUrl}
                                setImageUrl={setImageUrl}
                            />

                            <DoctorSpecializedDetails
                                DoctorData={DoctorData}
                                setDoctorData={setDoctorData}
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
                                <InsertDriveFileIcon />
                                Certificates
                            </Typography>
                            <CertificateTable
                                DoctorData={DoctorData}
                                setDoctorData={setDoctorData}
                                HandleCertificateEdit={HandleCertificateEdit}
                                setChanges={setChanges}
                            />
                            <Button style={{ backgroundColor: 'inherit', color: '#3f51b5', width: 'fit-content', fontWeight: 'bold', fontSize: '16px', marginTop: '-10px' }}
                                onClick={() => { CertificateModalOpen() }}
                                startIcon={<AddCircleOutline />}
                            >
                                Add Certificate
                            </Button>


                            <Typography variant="h6"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontWeight: 'bold'
                                }}
                            >
                                <MedicalServicesIcon />
                                Services</Typography>
                            <DoctorServices
                                DoctorData={DoctorData}
                                setDoctorData={setDoctorData}
                                HandleServicesEdit={HandleServicesEdit}
                                setChanges={setChanges}
                            />

                            <Button style={{ backgroundColor: 'inherit', color: '#3f51b5', width: 'fit-content', fontWeight: 'bold', fontSize: '16px', marginTop: '-10px' }}
                                onClick={() => { ServicesModalOpen() }}
                                startIcon={<AddCircleOutline />}
                            >
                                Add Service
                            </Button>
                        </div>

                        <AddCertificate
                            setDoctorData={setDoctorData}
                            CertificateModal={CertificateModal}
                            CertificateModalClose={CertificateModalClose}
                            setChanges={setChanges}
                            setFiles={setFiles}
                        />
                        <EditCertificate
                            DoctorData={DoctorData}
                            setDoctorData={setDoctorData}
                            CertificateEditModal={CertificateEditModal}
                            CertificateEditModalClose={CertificateEditModalClose}
                            CertificateIndex={CertificateEditIndex}
                            setChanges={setChanges}
                            setFiles={setFiles}
                        />

                        <AddService
                            setDoctorData={setDoctorData}
                            ServiceModal={ServicesModal}
                            ServiceModalClose={ServicesModalClose}
                            setChanges={setChanges}
                        />

                        <EditService
                            DoctorData={DoctorData}
                            setDoctorData={setDoctorData}
                            ServicesEditModal={ServicesEditModal}
                            ServiceModalClose={ServicesEditModalClose}
                            ServiceIndex={ServicesEditIndex}
                            setChanges={setChanges}
                        />

                        <Container style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button variant="contained"
                                style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
                                onClick={() => {
                                    setDoctorData(draft => {
                                        draft.user.name = History.user.name;
                                        draft.user.dob = History.user.dob;
                                        draft.user.country = History.user.country;
                                        draft.user.phoneNumber = History.user.phoneNumber;
                                        draft.user.email = History.user.email;
                                        draft.specialization = History.specialization;
                                        draft.description = History.description;
                                        draft.location = History.location;
                                        draft.experience = History.experience;
                                        draft.workingHours = History.workingHours;
                                        draft.availability = History.availability;
                                        draft.session = History.session;
                                        draft.certificates = History.certificates;
                                        draft.services = History.services;
                                    });
                                    setChanges(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained"
                                style={{ backgroundColor: Changes ? '#3f51b5' : 'grey', color: 'white', marginTop: '20px' }}
                                onClick={() => {
                                    SaveChanges();
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

export default DoctorManageAccount;