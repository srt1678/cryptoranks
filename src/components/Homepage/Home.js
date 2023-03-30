import { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { AppContext } from "../../App";
import { apiKey, allCoinsUrl } from "../../Api";
import HomeCryptoCard from "./HomeCryptoCard";

export const Home = () => {
    const { setAllCoins } =
        useContext(AppContext);

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

    return (
        <section id="topCrypto" className="mb-5">
            <h1 className="homePageTitle my-5">Top 20 Cryptos In the World</h1>
            <Container fluid className="cryptoCardOverallContainer px-3">
                <Row className="cryptoCardRow">
                    <HomeCryptoCard />
                </Row>
            </Container>
        </section>
    );
};
