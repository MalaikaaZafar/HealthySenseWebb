import { Button, Container, Typography } from "@mui/material";
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
import axios from "axios";

const DoctorManageAccount = () => {
    const ID = "658aeab2a07cfdec21fc4931";
    const [isLoading, setIsLoading] = useState(true);
    const [Changes, setChanges] = useState(false);
    const [ImageUrl, setImageUrl] = useState(null);

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

    const [History, setHistory] = useImmer({
        users: {
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
        fee: 500,
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

    const fetchDoctorData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/doctor/account/${ID}`);
            const data = response.data;
            data.doctor.user.dob = data.doctor.user.dob.slice(0, 10);
            setIsLoading(false);
            console.log(data.doctor);
            setDoctorData(data.doctor);
            setHistory(data.doctor);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDoctorData();
    }, []);

    return (
        <>
            <LoadingAnimation isVisible={isLoading} />
            {
                isLoading ? null : <Container style={{ marginBottom: '70px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
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
                        <Typography variant="h6">Certificates</Typography>
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


                        <Typography variant="h6">Services</Typography>
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
                    />
                    <EditCertificate
                        DoctorData={DoctorData}
                        setDoctorData={setDoctorData}
                        CertificateEditModal={CertificateEditModal}
                        CertificateEditModalClose={CertificateEditModalClose}
                        CertificateIndex={CertificateEditIndex}
                        setChanges={setChanges}
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
                                    draft.user = History.users;
                                    draft.specialization = History.specialization;
                                    draft.description = History.description;
                                    draft.location = History.location;
                                    draft.experience = History.experience;
                                    draft.workingHours = History.workingHours;
                                    draft.fee = History.fee;
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

export default DoctorManageAccount;