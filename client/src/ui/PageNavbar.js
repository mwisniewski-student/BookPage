import { Navbar, Container, NavbarBrand, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNavbar = () => {
    return (
        <Navbar className="sticky-top navbar-dark bg-dark" expand="lg">
            <Container fluid>
                <Link to="/" className="navbar-brand">Book Page</Link>
                <Navbar.Toggle type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-nabar-nav">
                    <Nav>
                        <Link to="/authors" className="nav-link">Authors</Link >
                    </Nav>
                    <Nav className="ms-auto">
                        <Link to="/books/add" className="nav-link">Add Book</Link >
                        <Link to="/authors/add" className="nav-link">Add Author</Link >
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default PageNavbar