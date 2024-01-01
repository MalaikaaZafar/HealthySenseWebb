import React from "react";
import { Page, Text, Document, View, StyleSheet, Image } from "@react-pdf/renderer";
import healthySenseLogo from "../healthySenseLogo.png";
import { useReport } from "./DownloadReport";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    section1: {
        margin: 10,
        flexDirection: 'row',
        backgroundColor: '#0045F3',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '96.75%',
        height: '50px',
    },
    image: {
        width: 40,
        height: 40
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        gap: 6,
        fontSize: 18,
        color: 'white',
        width: '50%',
        height: '50px',
    },
    header2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: 24,
        padding: 10,
        color: 'white',
        width: '50%',
        height: '50px',
    },
    section2: {
        margin: 10,
        marginTop: 0,
        height: 'auto',
        width: '96.75%',
        flexDirection: 'row',
        fontSize: 12,
        border: '1px solid black',
        borderTop: 'none',
    },
    column1: {
        flexDirection: 'column',
        width: '50%',
        height: 'auto',
        padding: 10,
        gap: 6,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRight: '1px solid black',
    },
    column2: {
        flexDirection: 'column',
        width: '50%',
        height: 'auto',
        padding: 10,
        gap: 7,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    section3: {
        margin: 10,
        marginTop: 0,
        padding: 10,
        height: 'auto',
        width: '96.75%',
        color: 'white',
        marginBottom: 0,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    section3header: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        padding: 10,
        gap: 6,
        alignItems: 'center',
        fontSize: 16,
        justifyContent: 'flex-start',
    },
    section4: {
        margin: 10,
        marginTop: 5,
        padding: 10,
        minHeight: '200px',
        height: 'auto',
        width: '96.75%',
        fontSize: 12,
        textAlign: 'left',
        border: '1px solid black',
    },
    section5: {
        margin: 10,
        marginTop: 5,
        padding: 10,
        minHeight: '330px',
        height: 'auto',
        width: '96.75%',
        fontSize: 12,
        textAlign: 'left',
        border: '1px solid black',
    },
});



// Create Document Component
const MyDocument = (props) => {
    const Diagnosis = props.Diagnosis;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section1}>
                    <View style={styles.header}>
                        <Image src={healthySenseLogo} style={styles.image} />
                        <Text>HealthySense</Text>
                    </View>
                    <View style={styles.header2}>
                        <Text>Patient Report</Text>
                    </View>
                </View>
                <View style={styles.section3}>
                    <Text>Information</Text>
                </View>
                <View style={styles.section2}>
                    <View style={styles.column1}>
                        <View style={styles.row}>
                            <Text>Patient Name: </Text>
                            <Text>{Diagnosis.PaitentName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Patient Phone: </Text>
                            <Text>{Diagnosis.PatientPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Patient Email: </Text>
                            <Text>{Diagnosis.PatientEmail}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Patient Problem: </Text>
                            <Text>{Diagnosis.PatientDob}</Text>
                        </View>
                    </View>
                    <View style={styles.column2}>
                        <View style={styles.row}>
                            <Text>Doctor Name: </Text>
                            <Text>{Diagnosis.DoctorName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Doctor Specialization: </Text>
                            <Text>{Diagnosis.DoctorPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Doctor Location: </Text>
                            <Text>{Diagnosis.ApointmentDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Appointment Date & Time: </Text>
                            <Text>{Diagnosis.ApointmentTime}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section3header}>
                    <Text>Diagnosis:</Text>
                </View>
                <View style={styles.section4}>
                    <Text>{Diagnosis.diagnosis}</Text>
                </View>
                <View style={styles.section3header}>
                    <Text>Tests:</Text>
                </View>
                <View style={styles.section5}>
                    {
                        Diagnosis.tests.length === 0 ? <Text>No Tests</Text> :
                            Diagnosis.tests.map((test) => {
                                return (
                                    <View style={styles.row}>
                                        <Text>{test}</Text>
                                    </View>
                                )
                            })
                    }
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section1}>
                    <View style={styles.header}>
                        <Image src={healthySenseLogo} style={styles.image} />
                        <Text>HealthySense</Text>
                    </View>
                    <View style={styles.header2}>
                        <Text>Patient Report</Text>
                    </View>
                </View>
                <View style={styles.section3}>
                    <Text>Information</Text>
                </View>
                <View style={styles.section2}>
                    <View style={styles.column1}>
                        <View style={styles.row}>
                            <Text>Patient Name: </Text>
                            <Text>{Diagnosis.PaitentName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Patient Phone: </Text>
                            <Text>{Diagnosis.PatientPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Patient Email: </Text>
                            <Text>{Diagnosis.PatientEmail}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Patient Problem: </Text>
                            <Text>{Diagnosis.PatientDob}</Text>
                        </View>
                    </View>
                    <View style={styles.column2}>
                        <View style={styles.row}>
                            <Text>Doctor Name: </Text>
                            <Text>{Diagnosis.DoctorName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Doctor Specialization: </Text>
                            <Text>{Diagnosis.DoctorPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Doctor Location: </Text>
                            <Text>{Diagnosis.ApointmentDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Date & Time: </Text>
                            <Text>{Diagnosis.ApointmentTime}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section3header}>
                    <Text>Notes:</Text>
                </View>
                <View style={styles.section4}>
                    <Text>{Diagnosis.notes}</Text>
                </View>
                <View style={styles.section3header}>
                    <Text>Medicine:</Text>
                </View>
                <View style={styles.section5}>
                    {
                        Diagnosis.prescriptions.length === 0 ? <Text>No Medicine</Text> :
                            Diagnosis.prescriptions.map((prescription) => {
                                return (
                                    <View style={styles.row}>
                                        <Text>{prescription.Name}</Text>
                                        <Text>{prescription.Dosage}</Text>
                                    </View>
                                )
                            })
                    }
                </View> 
            </Page>
        </Document>
    )
};

export default MyDocument;