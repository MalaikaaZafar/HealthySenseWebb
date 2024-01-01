import React from 'react';
import noResultsImage from '../assets/images/noResults.png';

const SearchErrorMessage = ({ notFound, error, role }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={noResultsImage} alt="No results" style={{ minWidth:'200px', width: '25%', height: '25%', p: 0,marginTop:5 }} />
        <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', lineHeight: 'normal' }}>
            {notFound ? (role === 'doctor' ? 'No Doctors Found' : 'No Patients Found') : error ? 'Something went wrong' : (role === 'doctor' ? 'Search for a doctor' : 'Search for a patient')}
        </h1>
        <h4 style={{ textAlign: 'center', fontSize: 20, fontWeight: 'normal' }}>
            {notFound ? `Try searching for something else or making sure there aren't any typos` : error ? 'Please try again later' : (role === 'doctor' ? 'Search for a doctor by name, specialty or location' : 'Search for a patient by name, specialty or location')}
        </h4>
    </div>
);

export default SearchErrorMessage;