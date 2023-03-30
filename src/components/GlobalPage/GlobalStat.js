import React, { useContext } from "react";
import { AppContext } from "../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import millify from "millify";

const GlobalStat = () => {
    const { globalStatData } = useContext(AppContext);
    return (
        <Container className="globalStatContainer">
            <Row className="">
                <Col xl className="my-2">
                    <h5 className="globalStatTitle">Total Cryptocurrencies</h5>
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
                    <h5 className="globalStatTitle">Total Market Cap</h5>
                    <h3 className="globalStatNum">
                        {millify(globalStatData?.totalMarketCap)}
                    </h3>
                </Col>
            </Row>
            <Row className="">
                <Col xl className="my-2">
                    <h5 className="globalStatTitle">Total 24hr Volume</h5>
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
    );
};

export default GlobalStat;
