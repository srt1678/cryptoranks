import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../App";
import { singleCoinUrl, options } from "../../Api";
import CryptoDetailCol1 from "./CryptoDetailCol1";
import CryptoDetailCol2 from "./CryptoDetailCol2";
import CryptoDetailCol3 from "./CryptoDetailCol3";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CryptoDetailChart from "./CryptoDetailChart";
import DropDownTimePeriod from "./DropDownTimePeriod";

export const CryptoDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [coinHistoryData, setCoinHistoryData] = useState([]);
    const {
        selectSingleCoin,
        singleCoinDetail,
        setSingleCoinDetail,
        selectTimePeriod
    } = useContext(AppContext);

    async function fetchSingleCoinData() {
        const response = await fetch(singleCoinUrl + selectSingleCoin, options);
        const result = await response.json();
        setSingleCoinDetail(result.data.coin);
        setIsLoading(false);

        const response2 = await fetch(
            singleCoinUrl + selectSingleCoin + "/history",
            options
        );
        const result2 = await response2.json();
        setCoinHistoryData(result2.data.history);
        setIsLoading2(false);
    }

    useEffect(() => {
        fetchSingleCoinData();
    }, [selectSingleCoin]);

    useEffect(() => {
        fetch(
            singleCoinUrl +
                selectSingleCoin +
                "/history?timePeriod=" +
                selectTimePeriod,
            options
        )
            .then((response) => response.json())
            .then((result) => {
                setCoinHistoryData(result.data.history);
            });
    }, [selectTimePeriod]);

    if (isLoading || isLoading2) {
        return <div style={{display: 'flex', justifyContent: 'center'}} className='my-5'><h1>Now Loading...</h1></div>;
    }
    return (
        <>
            <section id="cryptoDetailSection" className="my-5">
                <Container>
                    <Row className="cryptoDetailRow">
                        <CryptoDetailCol1 />
                        <CryptoDetailCol2 />
                        <CryptoDetailCol3 />
                    </Row>
                </Container>
            </section>

            <section className="cryptoDetailDescription pb-5">
                <Card
                    border="light"
                    bg="dark"
                    className="cryptoDetailDescript py-3 px-5 mx-5 rounded-5 text-center"
                    style={{ width: "80%" }}
                >
                    <Card.Body>
                        <h5>{singleCoinDetail.description}</h5>
                    </Card.Body>
                </Card>
            </section>

            <section className="my-5">
                <DropDownTimePeriod />
                <CryptoDetailChart
                    coinName={singleCoinDetail?.name}
                    coinHistoryData={coinHistoryData}
                />
            </section>
        </>
    );
};
