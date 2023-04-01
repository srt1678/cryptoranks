import React, { useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { AppContext } from "../../App";
import Button from "react-bootstrap/Button";

const CoinChartAlert = () => {
    const { setCoinChartAlert } = useContext(AppContext);
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <Alert
                style={{ width: "60%", paddingLeft: '3rem' }}
                variant="danger"
                onClose={() => setCoinChartAlert(false)}
                dismissible
            >
                <Alert.Heading>You got an error!</Alert.Heading>
                <h5 style={{ color: "black" }}>
                    The coin is already added or already reached the maximum
                    capacity of the list!
                </h5>
            </Alert>
        </div>
    );
};

export default CoinChartAlert;
