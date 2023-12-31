import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../components/loader/LoadingAnimation";
import { Box } from "@mui/system";
import { Avatar, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Snackbar, Alert } from "@mui/material";
import GetHistory from "../../services/doctor/diagnosis/getHistory";

const CustomTableRow = styled(TableRow)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    width: '100%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
}));

const CustomTableCell = styled(TableCell)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    width: '100%',
    border: 'none',
    gap: '10px'
}));

const PatientHistory = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const getHistoryData = async () => {
        const data = await GetHistory(id);
        if (data === null) {
            setOpen(true);
        } else {
            setData(data.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        getHistoryData();
    }, []);

    return (
        <>
            <LoadingAnimation isVisible={loading} />
            {
                !loading &&
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                    }}
                >
                    <Container
                        maxWidth="md"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            gap: '20px',
                            py: 3
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Patient History</Typography>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <CustomTableRow>
                                    <CustomTableCell sx={{ width: '20%', fontWeight:'bold', fontSize: '16px' }}>Type</CustomTableCell>
                                    <CustomTableCell sx={{ width: '75%', fontWeight:'bold', fontSize: '16px' }}>Description</CustomTableCell>
                                    <CustomTableCell sx={{ width: '15%', fontWeight:'bold', fontSize: '16px' }}>Date Created</CustomTableCell>
                                </CustomTableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.length > 0 ?
                                        data.map((row, index) => (
                                            <CustomTableRow key={index}>
                                                <CustomTableCell sx={{ width: '20%' }}>{row.type}</CustomTableCell>
                                                <CustomTableCell sx={{ width: '75%' }}>{row.description}</CustomTableCell>
                                                <CustomTableCell sx={{ width: '15%' }}>{row.date.slice(0,10)}</CustomTableCell>
                                            </CustomTableRow>
                                        ))
                                        :
                                        <CustomTableRow>
                                            <CustomTableCell sx={{ width: '100%' }}>No History Found!</CustomTableCell>
                                        </CustomTableRow>
                                }
                            </TableBody>
                        </Table>
                    </Container>

                </Box>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={6000}
            >
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    Something went wrong!
                </Alert>
            </Snackbar>
        </>
    );
}
export default PatientHistory;