import React from "react";
import { useParams } from "react-router-dom";
import { apiKey } from "../../Api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../img/bitcoin-btc-logo.png";

export const CryptoDetail = () => {
    const { symbol } = useParams();
    const options = {
        headers: {
            "x-access-token": apiKey,
        },
    };

    const cryptoName='Bitcoin';
    return (
        <>
            {/**/}
            <section id="cryptoDetailSection">
                <Row className="cryptoDetailRow">
                    <Col className="cryptoDetailCol1">
                        <div className="cryptoDetailCard">
                            <div class="cryptoDetailCardIcon">
                                <img src={img}></img>
                            </div>
                            <div className="cryptoDetailCardContent">
                                <div className="cryptoDetailCardTitle" style={cryptoName.length <= 6? {height: '80px'}:{height: '100px'}}>
                                    <h1 style={cryptoName.length <= 12? {fontSize: '40px'}:{fontSize: '22px'}}>{cryptoName}</h1>
                                </div>

                                <h4>BTC</h4>
                                <h4>Rank #1</h4>
                            </div>
                        </div>
                    </Col>
                    <Col className="cryptoDetailCol2"></Col>
                    <Col className="cryptoDetailCol3"></Col>
                </Row>
            </section>
        </>
    );
};

/*
fetch("https://api.coinranking.com/v2/coin/Qwsogvtv82FCd", options)
        .then((response) => response.json())
        .then((result) => console.log("Get Coin: ", result));
    fetch(`https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/price`, options)
        .then((response) => response.json())
        .then((result) => console.log("Get coin price: ", result));
    fetch(`https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history`, options)
        .then((response) => response.json())
        .then((result) => console.log("Get coin price history 24h: ", result));
    fetch(`https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history?timePeriod=1y`, options)
        .then((response) => response.json())
        .then((result) => console.log("Get coin price history 1y: ", result));
*/
