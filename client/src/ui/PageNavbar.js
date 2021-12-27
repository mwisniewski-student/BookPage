import { Navbar, Container, NavbarBrand, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNavbar = () => {
    return (
        <Navbar className="sticky-top navbar-expand-lg navbar-dark bg-dark">
            <Container fluid>
                <Link to="/" className="navbar-brand">Book Page</Link>
                <Navbar.Toggle type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav>
                        <Link to="/books" className="nav-link">Books</Link >
                        <Link to="/authors" className="nav-link">Authors</Link >
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default PageNavbar