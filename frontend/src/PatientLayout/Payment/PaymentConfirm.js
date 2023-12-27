import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPayement = () => {
    const navigate = useNavigate();
    return(
        <div className="Completed">
            <h1>Payment Successful</h1>
            <Button variant="contained"
                style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}
            >
                Go to Home
            </Button>
        </div>
    );
};

export default ConfirmPayement;