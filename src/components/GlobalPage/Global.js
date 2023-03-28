import { apiKey, globalStatsUrl, singleCoinUrl } from "../../Api.js";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import millify from "millify";

export const Global = () => {
    const {
        globalStatData,
        setGlobalStatData,
        best3CoinsData,
        setBest3CoinsData,
        newest3CoinsData,
        setNewest3CoinsData,
    } = useContext(AppContext);

    const options = {
        headers: {
            "x-access-token": `${apiKey}`,
        },
    };

    let temp3BestCoinsArray = [];
    let temp3NewestCoinsArray = [];
    async function fetchGlobalStats() {
        const response = await fetch(globalStatsUrl, options);
        const result = await response.json();
        setGlobalStatData(result.data);
    }
    const fetch3BestCoins = async () => {
        await Promise.all(
            globalStatData?.bestCoins?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid,
                    options
                );
                const result = await response.json();
                temp3BestCoinsArray.push(result.data.coin);
            })
        );
        setBest3CoinsData(temp3BestCoinsArray);
    };
    const fetch3NewestCoins = async () => {
        await Promise.all(
            globalStatData?.newestCoins?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid,
                    options
                );
                const result = await response.json();
                temp3NewestCoinsArray.push(result.data.coin);
            })
        );
        setNewest3CoinsData(temp3NewestCoinsArray);
    };

    useEffect(() => {
        fetchGlobalStats();
    }, []);

    useEffect(() => {
        fetch3BestCoins();
        fetch3NewestCoins();
    }, [globalStatData]);

    return (
        <>
            {/*Global Stats Section*/}
            <section id="globalStatSection" className="pb-5">
                <h2 className="globalStatPageTitle ps-5 my-5">
                    Global Crypto Statistics
                </h2>

                <Container className="globalStatContainer">
                    <Row className="">
                        <Col xl className="my-2">
                            <h5 className="globalStatTitle">
                                Total Cryptocurrencies
                            </h5>
                            <h3 className="globalStatNum">
                                {globalStatData?.totalCoins}
                            </h3>
                        </Col>
                        <Col xl className="my-2">
                            <h5 className="globalStatTitle">Total Exchanges</h5>
                            <h3 className="globalStatNum">
                                {globalStatData?.totalExchanges}
                            </h3>
                        </Col>
                        <Col xl className="my-2">
                            <h5 className="globalStatTitle">
                                Total Market Cap
                            </h5>
                            <h3 className="globalStatNum">
                                {millify(globalStatData?.totalMarketCap)}
                            </h3>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col xl className="my-2">
                            <h5 className="globalStatTitle">
                                Total 24hr Volume
                            </h5>
                            <h3 className="globalStatNum">
                                {millify(globalStatData?.total24hVolume)}
                            </h3>
                        </Col>
                        <Col xl className="my-2">
                            <h5 className="globalStatTitle">Total Markets </h5>
                            <h3 className="globalStatNum">
                                {millify(globalStatData?.totalMarkets)}
                            </h3>
                        </Col>
                        <Col xl></Col>
                    </Row>
                </Container>
            </section>

            {/*Current 3 Best Coins Section */}
            <section id="current3BestCoins" className="pb-5">
                <h2 className="globalStatPageTitle ps-5 my-5">
                    Current 3 Best Coins
                </h2>
                <Container className="currentBest3CoinsContainer">
                    <Row className="cryptoCardRow">
                        {best3CoinsData.map((singleCoin) => {
                            const {
                                name,
                                price,
                                marketCap,
                                change,
                                iconUrl,
                                uuid,
                            } = singleCoin;
                            return (
                                <Col
                                    xl
                                    key={uuid}
                                    className="cryptoCardCol my-2"
                                >
                                    <div className="cryptoCard">
                                        <Col className="cryptoCardCol1 ps-4">
                                            <div className="cryptoCardNameDiv">
                                                <h3 className="cryptoCardName my-2">
                                                    {name}
                                                </h3>
                                            </div>
                                            <span className="cryptoCardData fs-6 ps-3">
                                                Price:
                                            </span>
                                            <span className="cryptoCardDataNum">
                                                $ {millify(price)}
                                            </span>
                                            <br />
                                            <span className="cryptoCardData fs-6 ps-3">
                                                Market Cap:
                                            </span>
                                            <span className="cryptoCardDataNum">
                                                $ {millify(marketCap)}
                                            </span>
                                            <br />
                                            <span className="cryptoCardData fs-6 ps-3">
                                                Daily Change:
                                            </span>
                                            <span
                                                className="cryptoCardDataNum"
                                                style={
                                                    change > 0
                                                        ? {
                                                              color: "lightgreen",
                                                          }
                                                        : { color: "salmon" }
                                                }
                                            >
                                                {change > 0 ? (
                                                    <ChevronUp
                                                        className="me-1 mb-1"
                                                        style={{
                                                            fill: "lightgreen",
                                                        }}
                                                    />
                                                ) : (
                                                    <ChevronDown
                                                        className="me-1 mb-1"
                                                        style={{
                                                            fill: "salmon",
                                                        }}
                                                    />
                                                )}
                                                {change}
                                            </span>
                                        </Col>
                                        <Col className="cryptoCardCol2" xl={4}>
                                            <div className="cryptoCardIcon">
                                                <img
                                                    width={80}
                                                    src={iconUrl}
                                                ></img>
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>

            {/*Current 3 Newest Coins Section */}
            <section
                id="current3NewestCoins"
                className="current3NewestCoinsSection"
            >
                <h2 className="globalStatPageTitle ps-5 my-5">
                    Current 3 Newest Coins
                </h2>
                <Container className="currentNewest3CoinsContainer">
                    <Row className="cryptoCardRow">
                        {newest3CoinsData.map((singleCoin) => {
                            const { name, price, marketCap, uuid, iconUrl } =
                                singleCoin;
                            return (
                                <Col
                                    xl
                                    key={uuid}
                                    className="cryptoCardCol my-2"
                                >
                                    <div className="cryptoCard">
                                        <Col className="cryptoCardCol1 ps-4">
                                            <div className="cryptoCardNameDiv">
                                                <h3 className="cryptoCardName my-2">
                                                    {name}
                                                </h3>
                                            </div>
                                            <span className="cryptoCardData fs-6 ps-3">
                                                Price:
                                            </span>
                                            <span className="cryptoCardDataNum">
                                                $ {millify(price)}
                                            </span>
                                            <br />
                                            <span className="cryptoCardData fs-6 ps-3">
                                                Market Cap:
                                            </span>
                                            <span className="cryptoCardDataNum">
                                                $ {millify(marketCap)}
                                            </span>
                                            <br />
                                        </Col>
                                        <Col className="cryptoCardCol2" xl={4}>
                                            <div className="cryptoCardIcon">
                                                <img
                                                    width={80}
                                                    src={iconUrl}
                                                ></img>
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </section>
        </>
    );
};
