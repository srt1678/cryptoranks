import React from "react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../App";
import { useParams } from "react-router-dom";
import { apiKey, singleCoinUrl } from "../../Api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    Coin,
    LightningChargeFill,
    GraphUp,
    TrophyFill,
    Link,
    BarChartSteps,
    CurrencyExchange,
    DiamondHalf,
    CheckCircleFill,
    XCircleFill,
} from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import millify from "millify";
import CryptoDetailChart from "./CryptoDetailChart";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const CryptoDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [coinHistoryData, setCoinHistoryData] = useState([]);
    const { selectSingleCoin, singleCoinDetail, setSingleCoinDetail } =
        useContext(AppContext);
    const timeVariable = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y"];
    const [selectTimePeriod, setSelectTimePeriod] = useState("24h");

    const options = {
        headers: {
            "x-access-token": apiKey,
        },
    };

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
        return <div>Now Loading...</div>;
    }
    return (
        <>
            <section id="cryptoDetailSection" className="my-5">
                <Container>
                    <Row className="cryptoDetailRow">
                        <Col xxl={4} xl={6} className="cryptoDetailCol1">
                            <div className="cryptoDetailCard">
                                <div className="cryptoDetailCardIcon">
                                    <img src={singleCoinDetail?.iconUrl}></img>
                                </div>

                                <div className="cryptoDetailCardContent">
                                    <div
                                        className="cryptoDetailCardTitle"
                                        style={
                                            singleCoinDetail?.name.length <= 6
                                                ? { height: "80px" }
                                                : { height: "100px" }
                                        }
                                    >
                                        <h1
                                            style={
                                                singleCoinDetail?.name.length <=
                                                12
                                                    ? { fontSize: "40px" }
                                                    : { fontSize: "22px" }
                                            }
                                        >
                                            {singleCoinDetail?.name}
                                        </h1>
                                    </div>
                                    <h4>{singleCoinDetail.symbol}</h4>
                                    <h4>Rank #{singleCoinDetail?.rank}</h4>
                                </div>
                            </div>
                        </Col>

                        <Col xxl={4} xl={6} className="cryptoDetailCol2">
                            <div className="cryptoDetailStat1 my-4 mx-3">
                                <div className="cryptoDetailStat1TextArea px-3">
                                    <div className="cryptoDetailStat1ValueStat mt-5 ">
                                        <h3>Value Statistics</h3>
                                    </div>
                                    <div className="cryptoDetailStat1Data">
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <Coin
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Price to USD
                                            </span>
                                            <span style={{ float: "right" }}>
                                                ${" "}
                                                {millify(
                                                    singleCoinDetail?.price
                                                )}
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <LightningChargeFill
                                                    className="me-3"
                                                    size={20}
                                                />
                                                24h Volume
                                            </span>
                                            <span style={{ float: "right" }}>
                                                ${" "}
                                                {millify(
                                                    singleCoinDetail[
                                                        "24hVolume"
                                                    ]
                                                )}
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <GraphUp
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Market Cap
                                            </span>
                                            <span style={{ float: "right" }}>
                                                ${" "}
                                                {millify(
                                                    singleCoinDetail.marketCap
                                                )}
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span
                                                className="cryptoDetailStat1Title"
                                                style={{ fontSize: "18px" }}
                                            >
                                                <TrophyFill
                                                    className="me-3"
                                                    size={20}
                                                />
                                                All-Time-High (Daily Avg.)
                                            </span>
                                            <span style={{ float: "right" }}>
                                                ${" "}
                                                {millify(
                                                    singleCoinDetail.allTimeHigh
                                                        .price
                                                )}
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <Link
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Link
                                            </span>

                                            <span style={{ float: "right" }}>
                                                <a
                                                    href={
                                                        singleCoinDetail.websiteUrl
                                                    }
                                                    target="_blank"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    Official Website
                                                </a>
                                            </span>
                                        </h5>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xxl={4} xl={6} className="cryptoDetailCol3">
                            <div className="cryptoDetailStat1 my-4 mx-3">
                                <div className="cryptoDetailStat1TextArea px-3">
                                    <div className="cryptoDetailStat1ValueStat mt-5 ">
                                        <h3>Other Statistics</h3>
                                    </div>
                                    <div className="cryptoDetailStat1Data">
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <BarChartSteps
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Number Of Markets
                                            </span>
                                            <span style={{ float: "right" }}>
                                                {
                                                    singleCoinDetail.numberOfMarkets
                                                }
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <CurrencyExchange
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Number Of Exchanges
                                            </span>
                                            <span style={{ float: "right" }}>
                                                {
                                                    singleCoinDetail.numberOfExchanges
                                                }
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <DiamondHalf
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Aprroved Supply
                                            </span>
                                            <span style={{ float: "right" }}>
                                                {singleCoinDetail.supply
                                                    .confirmed ? (
                                                    <CheckCircleFill />
                                                ) : (
                                                    <XCircleFill />
                                                )}
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span
                                                className="cryptoDetailStat1Title"
                                                style={{ fontSize: "18px" }}
                                            >
                                                <DiamondHalf
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Total Supply
                                            </span>
                                            <span style={{ float: "right" }}>
                                                ${" "}
                                                {!singleCoinDetail.supply.total
                                                    ? "0"
                                                    : millify(
                                                          singleCoinDetail
                                                              .supply.total
                                                      )}
                                            </span>
                                        </h5>
                                        <br />
                                        <h5>
                                            <span className="cryptoDetailStat1Title">
                                                <DiamondHalf
                                                    className="me-3"
                                                    size={20}
                                                />
                                                Circulating Supply
                                            </span>
                                            <span style={{ float: "right" }}>
                                                ${" "}
                                                {!singleCoinDetail.supply
                                                    .circulating
                                                    ? "0"
                                                    : millify(
                                                          singleCoinDetail
                                                              .supply
                                                              .circulating
                                                      )}
                                            </span>
                                        </h5>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </Col>
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
                <Dropdown style={{ marginLeft: "11rem" }}>
                    <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        variant="secondary"
                    >
                        Time Period: {selectTimePeriod}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        {timeVariable.map((selectedTime) => {
                            return (
                                <Dropdown.Item
                                    disabled={
                                        selectedTime === selectTimePeriod
                                            ? true
                                            : false
                                    }
                                    onClick={() =>
                                        setSelectTimePeriod(selectedTime)
                                    }
                                >
                                    {selectedTime}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <CryptoDetailChart
                    coinName={singleCoinDetail?.name}
                    coinHistoryData={coinHistoryData}
                />
            </section>
        </>
    );
};
