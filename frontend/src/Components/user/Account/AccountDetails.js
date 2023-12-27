import { Avatar, TextField, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const AccountDetails = ({ Data, setData, setChanges,ImageUrl ,setImageUrl }) => {
    const HandleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setData(draft => {
                    draft.user.profilePicture = reader.result;
                })
            };
            setChanges(true);
        }
    }

    function isNumeric(value) {
        if (value == null || value === '') {
            return true;
        }
        return /^\d+$/.test(value);
    }

    return (
        <>
            <Typography variant="h4" style={{ textAlign: 'center' }}>Manage Account</Typography>
            <div className="column123">
                <Avatar sx={{ width: 300, height: 300 }} src={ImageUrl? Data.profilePicture :`http://localhost:5000/${Data.profilePicture}`}  />
                <div className="row-display">
                    <input type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => { HandleProfilePicChange(e) }}
                        id="profilePictureInput"
                    />
                    <label htmlFor="profilePictureInput">
                        <Typography variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }} component="span">
                            Change Profile Picture
                        </Typography>
                    </label>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px' }}>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={Data.name}
                    onChange={(e) => {
                        setData(draft => {
                            draft.user.name = e.target.value;
                        })
                        setChanges(true);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">

                            </InputAdornment>
                        ),
                        inputProps: {
                            min: 1000,
                        }
                    }}
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        label="Date of Birth"
                        defaultValue={dayjs(Data.dob)}
                        onChange={(e) => {
                            const date = dayjs(e).format('YYYY-MM-DD');
                            setData(draft => {
                                draft.user.dob = date;
                            })
                            setChanges(true);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ width: '100%' }}
                    />
                </LocalizationProvider>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px' }}>
                <TextField id="outlined-basic" label="Country" variant="outlined" value={Data.country} onChange={(e) => {
                    setData(draft => {
                        draft.user.country = e.target.value;
                    })
                    setChanges(true);
                }}
                    fullWidth
                />
                <TextField id="outlined-basic" label="Phone" variant="outlined" value={Data.phoneNumber} onChange={(e) => {
                    if (e.target.value.length > 12) {
                        alert("Phone Number Cannot be more than 12 digits")
                    }
                    else if (isNumeric(e.target.value)) {
                        setData(draft => {
                            draft.user.phoneNumber = e.target.value;
                        })
                        setChanges(true);
                    }
                }}
                    fullWidth
                />
            </div>
            <FormControl sx={{ m: 0, minWidth: 120 }}>
                <InputLabel htmlFor="uncontrolled-native">
                    Gender
                </InputLabel>
                <Select
                    value={Data.gender}
                    onChange={(e) => {
                        setData(draft => {
                            draft.user.gender = e.target.value;
                        })
                        setChanges(true);
                    }}
                    label="Gender"
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={Data.email} onChange={(e) => {
                setData(draft => {
                    draft.user.email = e.target.value;
                })
                setChanges(true);
            }} />
        </>
    );
}

export default AccountDetails;