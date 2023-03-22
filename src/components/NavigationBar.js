import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import cryptoLogo from "../img/cryptocurrency.png";
import { HouseFill, Globe, Lightbulb } from "react-bootstrap-icons";

export const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="py-2 fs-4 px-4">
            <Container className='navBarContainer'>
                <Navbar.Brand href="/" className="fs-1">
                    <img
                        src={cryptoLogo}
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
                        <Nav.Link as={Link} to="/News" className="me-4">
                            <Lightbulb className='me-2 mb-1'/>
                            News
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
