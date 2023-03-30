import React, { useContext } from "react";
import { AppContext } from "../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import millify from "millify";

const Global3NewestCoins = () => {
    const { newest3CoinsData } = useContext(AppContext);
    return (
        <Container className="currentNewest3CoinsContainer">
            <Row className="cryptoCardRow">
                {newest3CoinsData.map((singleCoin) => {
                    const { name, price, marketCap, uuid, iconUrl } =
                        singleCoin;
                    return (
                        <Col xl key={uuid} className="cryptoCardCol my-2">
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
                                        $ {!price ? "0" : millify(price)}
                                    </span>
                                    <br />
                                    <span className="cryptoCardData fs-6 ps-3">
                                        Market Cap:
                                    </span>
                                    <span className="cryptoCardDataNum">
                                        ${" "}
                                        {!marketCap ? "0" : millify(marketCap)}
                                    </span>
                                    <br />
                                </Col>
                                <Col className="cryptoCardCol2" xl={4}>
                                    <div className="cryptoCardIcon">
                                        <img width={80} src={iconUrl}></img>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default Global3NewestCoins;
