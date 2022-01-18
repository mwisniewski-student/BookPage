import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setLanguage } from "redux-i18n"
import { connect } from "react-redux";
import PropTypes from 'prop-types'

const PageNavbar = ({ setLanguage }, { t }) => {
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
                        <Link to="/authors" className="nav-link">{t('Authors')}</Link >
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown
                            title="Language"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={() => setLanguage('pl')}>{t('Polish')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setLanguage('en')}>{t('English')}</NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/books/add" className="nav-link">{t('Add Book')}</Link >
                        <Link to="/authors/add" className="nav-link">{t('Add Author')}</Link >
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

PageNavbar.contextTypes = {
    t: PropTypes.func
}

const mapDispatchToProps = {
    setLanguage
}
export default connect(undefined, mapDispatchToProps)(PageNavbar)