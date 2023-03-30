import React from "react";
import { useContext } from "react";
import Col from "react-bootstrap/Col";
import { AppContext } from "../../App";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import millify from "millify";
import { useNavigate } from "react-router-dom";

const HomeCryptoCard = () => {
    const { setSelectSingleCoin, allCoins } = useContext(AppContext);
    const navigate = useNavigate();

    const handleCryptoSelect = (uuid) => {
        setSelectSingleCoin(uuid);
        navigate(`detail/${uuid}`);
    };

    return (
        <>
            {allCoins.slice(0, 20).map((singleCoin) => {
                const { uuid, name, price, marketCap, change, iconUrl, rank } =
                    singleCoin;
                return (
                    <Col
                        key={uuid}
                        className="cryptoCardCol py-3"
                        sm={2}
                        xxl={3}
                    >
                        <div
                            className="cryptoCard"
                            onClick={() => handleCryptoSelect(uuid)}
                        >
                            <Col className="cryptoCardCol1 ps-4">
                                <div className="cryptoCardNameDiv">
                                    <h3 className="cryptoCardName my-2">
                                        {rank}. {name}
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
                                            ? { color: "lightgreen" }
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
                                            style={{ fill: "salmon" }}
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
        </>
    );
};

export default HomeCryptoCard;
