import React, { useContext } from "react";
import { AppContext } from "../../App";
import Col from "react-bootstrap/Col";
import millify from "millify";
import {
    BarChartSteps,
    CurrencyExchange,
    DiamondHalf,
    CheckCircleFill,
    XCircleFill,
} from "react-bootstrap-icons";

const CryptoDetailCol3 = () => {
    const { singleCoinDetail } = useContext(AppContext);
    return (
        <Col xxl={4} xl={6} className="cryptoDetailCol3">
            <div className="cryptoDetailStat1 my-4 mx-3">
                <div className="cryptoDetailStat1TextArea px-3">
                    <div className="cryptoDetailStat1ValueStat mt-5 ">
                        <h3>Other Statistics</h3>
                    </div>
                    <div className="cryptoDetailStat1Data">
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <BarChartSteps className="me-3" size={20} />
                                Number Of Markets
                            </span>
                            <span style={{ float: "right" }}>
                                {singleCoinDetail.numberOfMarkets}
                            </span>
                        </h5>
                        <br />
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <CurrencyExchange className="me-3" size={20} />
                                Number Of Exchanges
                            </span>
                            <span style={{ float: "right" }}>
                                {singleCoinDetail.numberOfExchanges}
                            </span>
                        </h5>
                        <br />
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <DiamondHalf className="me-3" size={20} />
                                Aprroved Supply
                            </span>
                            <span style={{ float: "right" }}>
                                {singleCoinDetail.supply.confirmed ? (
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
                                <DiamondHalf className="me-3" size={20} />
                                Total Supply
                            </span>
                            <span style={{ float: "right" }}>
                                ${" "}
                                {!singleCoinDetail.supply.total
                                    ? "0"
                                    : millify(singleCoinDetail.supply.total)}
                            </span>
                        </h5>
                        <br />
                        <h5>
                            <span className="cryptoDetailStat1Title">
                                <DiamondHalf className="me-3" size={20} />
                                Circulating Supply
                            </span>
                            <span style={{ float: "right" }}>
                                ${" "}
                                {!singleCoinDetail.supply.circulating
                                    ? "0"
                                    : millify(
                                          singleCoinDetail.supply.circulating
                                      )}
                            </span>
                        </h5>
                        <br />
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default CryptoDetailCol3;
