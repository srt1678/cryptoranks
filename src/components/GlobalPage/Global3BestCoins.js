import React, { useContext } from "react";
import { AppContext } from "../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import millify from "millify";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Global3BestCoins = () => {
    const { setSelectSingleCoin, best3CoinsData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleCryptoSelect = (uuid) => {
        setSelectSingleCoin(uuid);
        navigate(`../detail/${uuid}`);
    };

    return (
        <Container className="currentBest3CoinsContainer">
            <Row className="cryptoCardRow">
                {best3CoinsData.map((singleCoin) => {
                    const { name, price, marketCap, change, iconUrl, uuid } =
                        singleCoin;
                    return (
                        <Col xl key={uuid} className="cryptoCardCol my-2">
                            <div className="cryptoCard" onClick={() => handleCryptoSelect(singleCoin.uuid)}>
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

export default Global3BestCoins;
