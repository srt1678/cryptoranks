import React, { useContext } from "react";
import { AppContext } from "../../App";
import Col from "react-bootstrap/Col";

const CryptoDetailCol1 = () => {
    const { singleCoinDetail } = useContext(AppContext);
    return (
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
                                singleCoinDetail?.name.length <= 12
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
    );
};

export default CryptoDetailCol1;
