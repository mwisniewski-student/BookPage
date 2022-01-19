import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";
import { Card, Row, Image, DropdownButton, Dropdown, Button, ButtonGroup, Offcanvas, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setBookRequestStatus } from "../../ducks/requestsStatus/actions";
import { IoOptionsSharp } from 'react-icons/io5';
import FilterBooksForm from './FilterBooksForm';
import Pagination from "../Pagination";
import PropTypes from 'prop-types'


const BookList = ({ books, getBookList, setBookRequestStatus, bookRequestStatus }, { t }) => {
    useEffect(() => {
        !bookRequestStatus && getBookList() && setBookRequestStatus(true);
    }, [books]);

    const [startBookList, setStartBookList] = useState([])
    const [displayedBooks, setDisplayedBooks] = useState([])
    const [sortedOption, setSortedOption] = useState(t('Alphabetically'))
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;


    const setStartingOptions = () => {
        const booksSorted = [...books].sort((x, y) => x.title.toLowerCase().localeCompare(y.title.toLowerCase()))
        setStartBookList(booksSorted)
        setDisplayedBooks(booksSorted)
        setSortedOption(t('Alphabetically'))
    }

    useEffect(() => {
        setStartingOptions()
    }, [books])

    const sortByNumberOfPages = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => y.numberOfPages - x.numberOfPages)])
        setSortedOption(t('Number Of Pages'))
    }

    const sortByNumberOfPagesAscending = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => x.numberOfPages - y.numberOfPages)])
        setSortedOption(t('Number Of Pages(Ascending)'))
    }

    const sortAlphabetically = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => x.title.toLowerCase().localeCompare(y.title.toLowerCase()))])
        setSortedOption(t('Alphabetically'))
    }
    const sortAlphabeticallyReverse = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => y.title.toLowerCase().localeCompare(x.title.toLowerCase()))])
        setSortedOption(t('Alphabetically(Reverse)'))
    }

    const sortByPublishDate = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => new Date(x.publishDate) - new Date(y.publishDate))])
        setSortedOption(t("By Oldest"))
    }

    const sortByPublishDateReverse = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => new Date(y.publishDate) - new Date(x.publishDate))])
        setSortedOption(t("By Youngest"))
    }

    const [showFilterCanvas, setShowFilterCanvas] = useState(false);
    const handleCloseFilterCanvas = () => setShowFilterCanvas(false);
    const handleShowFilterCanvas = () => setShowFilterCanvas(true);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentDisplayedBooks = displayedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h3>{t("Book List")}</h3>
            <ButtonGroup aria-label="Filter or Sort" className="mb-3">
                <Button variant="primary" onClick={handleShowFilterCanvas}><IoOptionsSharp size={25} />  {t('Filter')}</Button>
                <DropdownButton as={ButtonGroup} id="bg-nested-dropdown" variant="secondary" title={`${t('Sort')}: ${sortedOption}`}>
                    <Dropdown.Item onClick={sortByNumberOfPages}>{t('Number Of Pages')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortByNumberOfPagesAscending}>{t('Number Of Pages(Ascending)')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortAlphabetically}>{t('Alphabetically')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortAlphabeticallyReverse}>{t('Alphabetically(Reverse)')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortByPublishDate}>{t('By Oldest')}</Dropdown.Item>
                    <Dropdown.Item onClick={sortByPublishDateReverse}>{t('By Youngest')}</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>

            <Offcanvas show={showFilterCanvas} onHide={handleCloseFilterCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>Filter</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FilterBooksForm setDisplayedBooks={setDisplayedBooks} allBooks={startBookList}
                        setCanvasShow={setShowFilterCanvas} setSortedOption={setSortedOption} paginate={paginate} />
                </Offcanvas.Body>
            </Offcanvas>


            {
                currentDisplayedBooks ? currentDisplayedBooks.map(book => {
                    return (
                        <Card className="mb-3" key={book.id}>
                            <Row>
                                <div className="col-md-4">
                                    <Image className="list-img" src={book.image} alt={book.title + " cover"} fluid />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>
                                            {book.title}
                                        </Card.Title>
                                        {book.categories.map((category, i) => <Badge className="me-2" bg="secondary" key={i}>{t(category)}</Badge>)}
                                        <Card.Text className="mt-2">{book.description}</Card.Text>
                                        <Card.Text><small className="text-muted">{t('Pages')}: {book.numberOfPages}</small></Card.Text>
                                        <Card.Text><small className="text-muted">{t('Published')}: {new Date(book.publishDate).toLocaleDateString()}</small></Card.Text>
                                        <Link className="btn btn-primary" to={`/books/${book.id}`}>{t('Details')}</Link>
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>)
                }) : null
            }
            <Pagination
                itemsPerPage={booksPerPage}
                totalItems={displayedBooks.length}
                paginate={paginate}
            />
        </div >
    )
};

BookList.contextTypes = {
    t: PropTypes.func
}


const mapStateToProps = (state) => {
    return {
        books: getAllBooks(state),
        bookRequestStatus: state.requestsStatus.hasBookRequestHappend
    };
}
const mapDispatchToProps = {
    getBookList,
    setBookRequestStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);