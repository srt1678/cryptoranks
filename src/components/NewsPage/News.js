import { useEffect, useContext } from "react";
import { newsUrl, newsApiKey } from "../../Api.js";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AppContext } from "../../App";
import img from '../../img/No_Image_Available.jpg';

export const News = () => {
    const { newsData, setNewsData } = useContext(AppContext);

    const options = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const fetchNewsData = () => {
        fetch(newsUrl + newsApiKey, options)
            .then((response) => response.json())
            .then((result) => {
                setNewsData(result.articles);
            });
    };

    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <>
            <Row xl={4} lg={2} md={2} xs={1} className="g-4 py-5 px-5">
                {newsData.slice(0, 10).map((singleNews) => {
                    const {author, description, publishedAt, title, url, urlToImage} = singleNews;
                    return(
                        <Col>
                    <a
                        href={url}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                    >
                        <Card
                            className="newsCardContainer"
                            bg="dark"
                            border="light"
                        >
                            <Card.Img
                                className='newsCardImage'
                                variant="dark"
                                src={urlToImage? urlToImage:img}
                            />
                            <Card.Body className="newsCardBody">
                                <Card.Title className="newsCardTitle my-3 px-2">
                                    {title}
                                </Card.Title>
                                <Card.Text className="newsCardDescription mb-4 px-2">
                                    {description}
                                </Card.Text>
                                <Card.Text className="newsCardFooter px-2">
                                    <span className='newsCardAuthor'>
                                        {author}
                                    </span>
                                    <span style={{ float: "right" }}>
                                        {publishedAt.substring(0, 10)}
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </a>
                </Col>
                    )
                })}
            </Row>
        </>
    );
};

