import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DoctorCard from '../components/DoctorCard';
import FilterPopover from '../components/FilterPopover';
import './Search.css';
import styles from '../styles/searchStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchErrorMessage from '../components/SearchErrorMessage';
import ViewAlldoctors from '../adminlayout/ViewAllDoctors';
import searchDoctors from '../services/admin/searchDoctor';


const AdminDoctor = () => {
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [searchText, setSearchText] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const [specialtyFilter, setSpecialtyFilter] = React.useState('');
    const [notFound, setNotFound] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [actionCompleted, setActionCompleted] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [searched, setSearched] = React.useState(false);
    let direction = 'asc';
    // ...

    const fetchMoreData = async () => {

        console.log("fetching more data")
        const skip = doctors.length;
        let moreDoctors = await searchDoctors(searchText, direction, specialtyFilter, skip);
        if (moreDoctors.length === 0) {
            setHasMore(false);
            return;
        }
        setDoctors(doctors.concat(moreDoctors));
    };



    const handleSpecialtyFilter = (value) => {
        setSpecialtyFilter(value);
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
        const result = await searchDoctors(searchText, direction, specialtyFilter, 0);
        console.log(result);
        if (result == -1) {
            setError(true);
            setActionCompleted(true);
            return;
        }

        setDoctors(result);
        if (doctors.length === 0) {
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
                        <FilterPopover handleFilterChange={handleSpecialtyFilter} specialty={specialtyFilter} onApply={searchPressed} />
                    </Box>
                    <Box sx={styles.buttonGroup}>
                        <IconButton
                            aria-label="sort direction"
                            onClick={toggleSortDirection}
                            disabled={!actionCompleted}
                            sx={{ ...styles.button, backgroundColor: '#2854c3' }}>
                            <TextRotationNoneIcon sx={sortDirection === 'asc' ? { color: 'white' } : { color: 'white', transform: 'scaleX(-1)' }} fontSize='small' />                        </IconButton>
                    </Box>
                    {doctors.length > 0 && <h4 style={{ flexGrow: 1, marginTop: 2 }}>Showing {doctors?.length} results</h4>}
                </Box>
            </Box>
            {doctors.length > 0 && !error ? <InfiniteScroll
                dataLength={doctors.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={doctors && doctors.length > 3 ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}

                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more doctors, We couldn't find a suitable doctor for you :(</b>
                    </p>
                }
                style={{ overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}

            >
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    {doctors?.length > 0 && doctors.map((doctor) => {
                        return (
                            <DoctorCard user={doctor} />
                        );
                    })}
                </Box>
            </InfiniteScroll>
                :
                !notFound && !searched && !error ? <ViewAlldoctors /> : <SearchErrorMessage notFound={notFound} error={error} />
            }
        </div >
    );
};

export default AdminDoctor;

