import { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AppContext } from "../../App";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { apiKey, allCoinsUrl } from "../../Api";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { allCoins, setAllCoins } = useContext(AppContext);
    const navigate = useNavigate();

    const options = {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `${apiKey}`,
        },
    };
    useEffect(() => {
        fetch(allCoinsUrl, options)
            .then((response) => response.json())
            .then((result) => {
                setAllCoins(result.data.coins);
            });
    }, []);

    const handleCryptoSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }

    return (
        <section id="topCrypto" className='mb-5'>
            <h1 className="homePageTitle my-5">Top 20 Cryptos In the World</h1>
            <Container fluid className="cryptoCardOverallContainer px-3">
                <Row className="cryptoCardRow">
                    {allCoins.slice(0,20).map((singleCoin) => {
                        const {
                            uuid,
                            name,
                            price,
                            marketCap,
                            change,
                            iconUrl,
                            rank,
                            symbol
                        } = singleCoin;
                        return (
                            <Col
                                key={uuid}
                                className="cryptoCardCol py-3"
                                sm={2}
                                xxl={3}
                            >
                                <div className="cryptoCard" onClick={() => handleCryptoSelect(symbol.toLowerCase())}>
                                    <Col className="cryptoCardCol1 ps-4">
                                        <div className='cryptoCardNameDiv'>
                                            <h3 className="cryptoCardName my-2">
                                                {rank}. {name}
                                            </h3>
                                        </div>
                                        <span className="cryptoCardData fs-6 ps-3">
                                            Price:
                                        </span>
                                        <span className="cryptoCardDataNum">
                                            $ {Math.round(price * 100) / 100}
                                        </span>
                                        <br/>
                                        <span className="cryptoCardData fs-6 ps-3">
                                            Market Cap:
                                        </span>
                                        <span className="cryptoCardDataNum">
                                            ${" "}
                                            {Math.round(
                                                (marketCap / 1000000000) * 100
                                            ) / 100}
                                        </span>
                                        <br/>
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
                </Row>
            </Container>
        </section>
    );
};


