import React from 'react';
import LoadingGIF from './LoadingGIF.gif';
import { Container } from '@mui/material';

const LoadingAnimation = () => {
    return (
        <div className="loading-animation" >
            <img src={LoadingGIF} alt="Loading..." style={{ height:'200px', width:'200px',borderRadius:'100%'}}/>
        </div>
    )
}

export default LoadingAnimation