import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import websiteLogo from "../img/cryptocurrency.png";
import { HouseFill, Globe, Lightbulb, PieChart } from "react-bootstrap-icons";

export const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="py-2 fs-4 px-4">
            <Container className='navBarContainer'>
                <Navbar.Brand href="/" className="fs-1">
                    <img
                        src={websiteLogo}
                        alt="Crypto Logo"
                        className="navBarLogo img-fluid pe-4"
                        width={100}
                    />
                    Cryptoranks
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="me-4">
                            <HouseFill className="me-2 mb-2" />
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/global" className="me-4">
                            <Globe className='me-2 mb-1'/>
                            Global
                        </Nav.Link>
                        <Nav.Link as={Link} to="/news" className="me-4">
                            <Lightbulb className='me-2 mb-1'/>
                            News
                        </Nav.Link>
                        <Nav.Link as={Link} to="/comparison" className="me-4">
                            <PieChart className='me-2 mb-1'/>
                            Comparison
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
