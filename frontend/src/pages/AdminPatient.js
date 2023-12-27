import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DoctorCard from '../components/DoctorCard';
import FilterPopover from '../components/FilterPopover';
import './Search.css';
import styles from '../styles/searchStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchErrorMessage from '../components/SearchErrorMessage';
import ViewAllPatients from '../adminlayout/ViewAllPatients';
import searchPatients from '../services/admin/searchPatient';
import PatientCard from '../components/PatientCard';
import { set } from 'date-fns';


const AdminPatient = () => {
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [searchText, setSearchText] = React.useState('');
    const [patients, setPatients] = React.useState([]);
    const [bloodFilter, setBloodFilter] = React.useState('');
    const [notFound, setNotFound] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [actionCompleted, setActionCompleted] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [searched, setSearched] = React.useState(false);
    let direction = 'asc';
    // ...

    const fetchMoreData = async () => {

        console.log("fetching more data")
        const skip = patients.length;
        let morePatients = await searchPatients(searchText, direction, bloodFilter, skip);
        if (morePatients.length === 0) {
            setHasMore(false);
            return;
        }
        setPatients(patients.concat(morePatients));
    };



    const handleBloodFilter = (value) => {
        setBloodFilter(value);
    };


    const handleSearch = (value) => {
        setSearchText(value);
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => {
            const newDirection = prevDirection === 'asc' ? 'desc' : 'asc';
            direction = newDirection;
            return newDirection;
        });
        searchPressed();
    };

    const searchPressed = async () => {
        // if (searchText === '') {
        //     alert('Please enter a search query');
        // }
        setActionCompleted(false);
        console.log(direction);
        const result = await searchPatients(searchText, direction, bloodFilter, 0);
        console.log(result);
        if (result == -1) {
            setError(true);
            setActionCompleted(true);
            return;
        }

        setPatients(result);
        if (patients.length === 0) {
            setNotFound(true);
        }
        else {
            setNotFound(false);
        }
        setActionCompleted(true);
        setError(false);
        setHasMore(true);
        setSearched(true);


    };
    return (
        <div style={{ marginTop: 50 }}>
            <Box sx={styles.container}>
                <Box sx={styles.searchBox}>
                    <Box sx={styles.searchBar}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            sx={styles.textField}
                            onChange={(e) => handleSearch(e.target.value)}
                            value={searchText}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    searchPressed();
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={searchPressed} sx={{ color: '#2854C3', padding: 0 }}>
                                            <SearchIcon fontSize='large' />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FilterPopover handleFilterChange={handleBloodFilter} specialty={bloodFilter} onApply={searchPressed} isPatient={true} />
                    </Box>
                    <Box sx={styles.buttonGroup}>
                        <IconButton
                            aria-label="sort direction"
                            onClick={toggleSortDirection}
                            disabled={!actionCompleted}
                            sx={{ ...styles.button, backgroundColor: '#2854c3' }}>
                            <TextRotationNoneIcon sx={sortDirection === 'asc' ? { color: 'white' } : { color: 'white', transform: 'scaleX(-1)' }} fontSize='small' />                        </IconButton>
                    </Box>
                    {patients.length > 0 && <h4 style={{ flexGrow: 1, marginTop: 2 }}>Showing {patients?.length} results</h4>}
                </Box>
            </Box>
            {patients.length > 0 && !error ? <InfiniteScroll
                dataLength={patients.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={patients && patients.length > 3 ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}

                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more patients, We couldn't find a suitable patient for you :(</b>
                    </p>
                }
                style={{ overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}

            >
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    {patients?.length > 0 && patients.map((patient) => {
                        return (
                            <PatientCard user={patient} />
                        );
                    })}
                </Box>
            </InfiniteScroll>
                :
                !notFound && !error && !searched ? <ViewAllPatients /> : <SearchErrorMessage notFound={notFound} error={error} role={'patient'} />
            }
        </div >
    );
};

export default AdminPatient;

