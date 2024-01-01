import { Avatar, Button, Container, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";


const DoctorSpecializedDetails = ({ DoctorData, setDoctorData, setChanges }) => {
    function isNumeric(value) {
        if (value == null || value === '') {
            return true;
        }
        return /^\d+$/.test(value);
    }
    return (
        <>
            <TextField id="outlined-basic" label="Specialization" variant="outlined" value={DoctorData.specialization} onChange={(e) => {
                setDoctorData(draft => {
                    draft.specialization = e.target.value;
                })
                setChanges(true);
            }} />
            <TextField id="outlined-basic" label="Description" variant="outlined" value={DoctorData.description} onChange={(e) => {
                setDoctorData(draft => {
                    draft.description = e.target.value;
                })
                setChanges(true);
            }} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px' }}>
                <TextField id="outlined-basic" label="Location" variant="outlined" value={DoctorData.location} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.location = e.target.value;
                    })
                    setChanges(true);
                }
                }
                    fullWidth
                />
                <TextField id="outlined-basic" label="Experience" variant="outlined" value={DoctorData.experience} onChange={(e) => {
                    if (isNumeric(e.target.value)) {
                        setDoctorData(draft => {
                            draft.experience = e.target.value;
                        })
                        setChanges(true);
                    }
                }}
                    fullWidth
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px' }}>
                <TextField id="outlined-basic" label="Working Hours" variant="outlined" value={DoctorData.workingHours} onChange={(e) => {
                    setDoctorData(draft => {
                        draft.workingHours = e.target.value;
                    })
                    setChanges(true);
                }
                } fullWidth />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px' }}>
                <TextField id="outlined-basic" label={DoctorData.session[0].type + " Fee"} variant="outlined" value={DoctorData.session[0].fee} onChange={(e) => {
                    if (isNumeric(e.target.value)) {
                        setDoctorData(draft => {
                            draft.session[0].fee = e.target.value;
                        })
                        setChanges(true);
                    }
                }
                } fullWidth />
                <TextField id="outlined-basic" label={DoctorData.session[1].type + " Fee"} variant="outlined" value={DoctorData.session[1].fee} onChange={(e) => {
                    if (isNumeric(e.target.value)) {
                        setDoctorData(draft => {
                            draft.session[1].fee = e.target.value;
                        })
                        setChanges(true);
                    }
                }
                } fullWidth />
            </div>
            <FormControl sx={{ m: 0, minWidth: 120 }}>
                <InputLabel htmlFor="uncontrolled-native"

                >Availability</InputLabel>
                <Select
                    value={DoctorData.availability}
                    onChange={(e) => {
                        setDoctorData(draft => {
                            draft.availability = e.target.value;
                        })
                        setChanges(true);
                    }}
                    label="Availability"
                >
                    <MenuItem value={true}>Available</MenuItem>
                    <MenuItem value={false}>Not Available</MenuItem>
                </Select>
            </FormControl>
        </>
    )

}

export default DoctorSpecializedDetails;