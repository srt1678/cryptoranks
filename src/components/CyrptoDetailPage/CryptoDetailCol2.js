import React, { useContext } from "react";
import { AppContext } from "../../App";
import Col from "react-bootstrap/Col";
import millify from "millify";
import {
    Coin,
    LightningChargeFill,
    GraphUp,
    TrophyFill,
    Link,
} from "react-bootstrap-icons";

const CryptoDetailCol2 = () => {
    const { singleCoinDetail } = useContext(AppContext);
    return (
        <Col xxl={4} xl={6} className="cryptoDetailCol2">
            <div className="cryptoDetailStat1 my-4 mx-3">
                <div className="cryptoDetailStat1TextArea px-3">
                    <div className="cryptoDetailStat1ValueStat mt-5 ">
                        <h3>Value Statistics</h3>
                    </div>
                    <div className="cryptoDetailStat1Data">
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <Coin className="me-3" size={20} />
                                Price to USD
                            </span>
                            <span style={{ float: "right" }}>
                                $ {millify(singleCoinDetail?.price)}
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
                                $ {millify(singleCoinDetail["24hVolume"])}
                            </span>
                        </h5>
                        <br />
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <GraphUp className="me-3" size={20} />
                                Market Cap
                            </span>
                            <span style={{ float: "right" }}>
                                $ {millify(singleCoinDetail.marketCap)}
                            </span>
                        </h5>
                        <br />
                        <h5>
                            <span
                                className="cryptoDetailStat1Title"
                                style={{ fontSize: "18px" }}
                            >
                                <TrophyFill className="me-3" size={20} />
                                All-Time-High (Daily Avg.)
                            </span>
                            <span style={{ float: "right" }}>
                                $ {millify(singleCoinDetail.allTimeHigh.price)}
                            </span>
                        </h5>
                        <br />
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <Link className="me-3" size={20} />
                                Link
                            </span>

                            <span style={{ float: "right" }}>
                                <a
                                    href={singleCoinDetail.websiteUrl}
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
    );
};

export default CryptoDetailCol2;
