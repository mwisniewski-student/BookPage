import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllAuthors } from "../../ducks/authors/selectors";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";
import { getAuthorList } from "../../ducks/authors/operations";
import { Link } from "react-router-dom";
import { Card, Row, Image, DropdownButton, Dropdown, Button, ButtonGroup, Offcanvas } from "react-bootstrap";
import { setBookRequestStatus, setAuthorRequestStatus } from "../../ducks/requestsStatus/actions";
import { IoOptionsSharp } from 'react-icons/io5';
import FilterAuthorsForm from "./FilterAuthorsForm";
import Pagination from "../Pagination";
import PropTypes from 'prop-types'

const AuthorList = ({ authors, getAuthorList, books, getBookList,
    authorRequestStatus, bookRequestStatus, setBookRequestStatus, setAuthorRequestStatus }, { t }) => {

    useEffect(() => {
        !authorRequestStatus && getAuthorList() && setAuthorRequestStatus(true);
        !bookRequestStatus && getBookList() && setBookRequestStatus(true)
    }, [books, authors]);

    const getNumberOfBooks = authorId => {
        return books.filter(book => book.authorsIds.includes(authorId)).length
    }

    const [startAuthorList, setStartAuthorList] = useState([])
    const [displayedAuthors, setDisplayedAuthors] = useState([])
    const [sortedOption, setSortedOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const authorsPerPage = 5;


    const setStartingOptions = () => {
        const authorsSortedAndMapped = [...authors].sort((x, y) => x.name.toLowerCase().localeCompare(y.name.toLowerCase()))
            .map(author => ({
                ...author,
                numberOfBooks: getNumberOfBooks(author.id)
            }))
        setStartAuthorList(authorsSortedAndMapped)
        setDisplayedAuthors(authorsSortedAndMapped)
        setSortedOption(t('Alphabetically'))
    }
    useEffect(() => {
        setStartingOptions()
    }, [authors])

    const sortByNumberOfBooks = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => getNumberOfBooks(y.id) - getNumberOfBooks(x.id))])
        setSortedOption(t('Number Of Books'))
    }

    const sortByNumberOfBooksAscending = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => getNumberOfBooks(x.id) - getNumberOfBooks(y.id))])
        setSortedOption(t('Number Of Books(Ascending)'))
    }

    const sortAlphabetically = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => x.name.toLowerCase().localeCompare(y.name.toLowerCase()))])
        setSortedOption(t('Alphabetically'))
    }
    const sortAlphabeticallyReverse = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => y.name.toLowerCase().localeCompare(x.name.toLowerCase()))])
        setSortedOption(t('Alphabetically(Reverse)'))
    }

    const sortByBirthDate = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => new Date(x.birthDate) - new Date(y.birthDate))])
        setSortedOption(t("By Oldest"))
    }

    const sortByBirthDateReverse = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => new Date(y.birthDate) - new Date(x.birthDate))])
        setSortedOption(t("By Youngest"))
    }

    const [showFilterCanvas, setShowFilterCanvas] = useState(false);
    const handleCloseFilterCanvas = () => setShowFilterCanvas(false);
    const handleShowFilterCanvas = () => setShowFilterCanvas(true);

    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentDisplayedAuthors = displayedAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h3>{t('Author list')}</h3>

            <ButtonGroup aria-label="Filter or Sort" className="mb-3">
                <Button variant="primary" onClick={handleShowFilterCanvas}><IoOptionsSharp size={25} />  {t('Filter')}</Button>
                <DropdownButton as={ButtonGroup} id="bg-nested-dropdown" variant="secondary" title={`${t('Sort')}: ${sortedOption}`}>
                    <Dropdown.Item onClick={sortByNumberOfBooks}>{t('Number of Books')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortByNumberOfBooksAscending}>{t('Number of Books(Ascending)')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortAlphabetically}>{t('Alphabetically')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortAlphabeticallyReverse}>{t('Alphabetically(Reverse)')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortByBirthDate}>{t('By Oldest')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortByBirthDateReverse}>{t('By Youngest')}</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>


            <Offcanvas show={showFilterCanvas} onHide={handleCloseFilterCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>{t('Filter')}</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FilterAuthorsForm setDisplayedAuthors={setDisplayedAuthors} allAuthors={startAuthorList}
                        setCanvasShow={setShowFilterCanvas} setSortedOption={setSortedOption} paginate={paginate} />
                </Offcanvas.Body>
            </Offcanvas>

            {
                currentDisplayedAuthors.length ? currentDisplayedAuthors.map(author => {
                    return (
                        <Card className="mb-3" key={author.id}>
                            <Row>
                                <div className="col-md-4">
                                    <Image className="list-img" src={author.image} alt={author.name + " photo"} thumbnail />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{author.name}</Card.Title>
                                        <Card.Text>{author.description}</Card.Text>
                                        <Card.Text><small className="text-muted">{t('Number of Books')}: {author.numberOfBooks}</small></Card.Text>
                                        <Card.Text><small className="text-muted">{t('Birth Date')}: {new Date(author.birthDate).toLocaleDateString()}</small></Card.Text>
                                        <Link className="btn btn-primary" to={`/authors/${author.id}`}>{t('Details')}</Link>
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>)
                }) : <div>{t('No Authors')}</div>
            }
            <Pagination
                itemsPerPage={authorsPerPage}
                totalItems={displayedAuthors.length}
                paginate={paginate}
            />
        </div >
    )
};

AuthorList.contextTypes = {
    t: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        authors: getAllAuthors(state),
        books: getAllBooks(state),
        authorRequestStatus: state.requestsStatus.hasAuthorRequestHappend,
        bookRequestStatus: state.requestsStatus.hasBookRequestHappend
    };
}
const mapDispatchToProps = {
    getAuthorList,
    getBookList,
    setBookRequestStatus,
    setAuthorRequestStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);