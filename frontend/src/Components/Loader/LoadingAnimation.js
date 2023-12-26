import React, { useState } from 'react';
import LoadingGIF from './LoadingGIF.gif';
import { Modal } from '@mui/material';

const LoadingAnimation = () => {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    return (
        <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="loading-animation" >
                <img src={LoadingGIF} alt="Loading..." style={{ height: '200px', width: '200px', borderRadius: '100%' }} />
            </div>
        </Modal>
    )
}

export default LoadingAnimation