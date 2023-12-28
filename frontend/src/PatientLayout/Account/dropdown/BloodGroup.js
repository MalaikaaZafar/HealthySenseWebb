import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";


const PatientBloodGroup = ({ PatientData, setPatientData, setChanges }) => {
    return (
        <FormControl sx={{ m:0, minWidth: 120 }}>
            <InputLabel htmlFor="uncontrolled-native">
                Blood Type
            </InputLabel>
            <Select
                value={PatientData.bloodGroup}
                onChange={(e) => {
                    setPatientData(draft => {
                        draft.bloodGroup = e.target.value;
                    })
                    setChanges(true);
                }}
                label="Blood Type"
            >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="Unknown">Unknown</MenuItem>
            </Select>
        </FormControl>
    );
}

export default PatientBloodGroup;