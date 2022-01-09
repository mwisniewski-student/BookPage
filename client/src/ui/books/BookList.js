import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";
import { Card, Row, Image, DropdownButton, Dropdown, Button, ButtonGroup, Offcanvas, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setBookRequestStatus } from "../../ducks/requestsStatus/actions";
import { IoOptionsSharp } from 'react-icons/io5';
import FilterBooksForm from './FilterBooksForm'


const BookList = ({ books, getBookList, setBookRequestStatus, bookRequestStatus }) => {
    useEffect(() => {
        !bookRequestStatus && getBookList() && setBookRequestStatus(true);
    }, [books]);

    const [startBookList, setStartBookList] = useState([])
    const [displayedBooks, setDisplayedBooks] = useState([])
    const [sortedOption, setSortedOption] = useState('Alphabetically')


    const setStartingOptions = () => {
        const booksSorted = [...books].sort((x, y) => x.title.toLowerCase().localeCompare(y.title.toLowerCase()))
        setStartBookList(booksSorted)
        setDisplayedBooks(booksSorted)
        setSortedOption('Alphabetically')
    }

    useEffect(() => {
        setStartingOptions()
    }, [books])

    const sortByNumberOfPages = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => y.numberOfPages - x.numberOfPages)])
        setSortedOption('Number Of Pages')
    }

    const sortByNumberOfPagesAscending = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => x.numberOfPages - y.numberOfPages)])
        setSortedOption('Number Of Pages(Ascending)')
    }

    const sortAlphabetically = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => x.title.toLowerCase().localeCompare(y.title.toLowerCase()))])
        setSortedOption('Alphabetically')
    }
    const sortAlphabeticallyReverse = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => y.title.toLowerCase().localeCompare(x.title.toLowerCase()))])
        setSortedOption('Alphabetically(Reverse)')
    }

    const sortByPublishDate = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => new Date(x.publishDate) - new Date(y.publishDate))])
        setSortedOption("By Oldest")
    }

    const sortByPublishDateReverse = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => new Date(y.publishDate) - new Date(x.publishDate))])
        setSortedOption("By Youngest")
    }

    const [showFilterCanvas, setShowFilterCanvas] = useState(false);
    const handleCloseFilterCanvas = () => setShowFilterCanvas(false);
    const handleShowFilterCanvas = () => setShowFilterCanvas(true);

    return (
        <div>
            <h3>Book list</h3>
            <ButtonGroup aria-label="Filter or Sort" className="mb-3">
                <Button variant="primary" onClick={handleShowFilterCanvas}><IoOptionsSharp size={25} />  Filter</Button>
                <DropdownButton as={ButtonGroup} id="bg-nested-dropdown" variant="secondary" title={`Sort: ${sortedOption}`}>
                    <Dropdown.Item onClick={sortByNumberOfPages}>Number of pages</Dropdown.Item>
                    <Dropdown.Item onClick={sortByNumberOfPagesAscending}>Number of pages(Ascending)</Dropdown.Item>
                    <Dropdown.Item onClick={sortAlphabetically}>Alphabetically</Dropdown.Item>
                    <Dropdown.Item onClick={sortAlphabeticallyReverse}>Alphabetically(Reverse)</Dropdown.Item>
                    <Dropdown.Item onClick={sortByPublishDate}>By Oldest</Dropdown.Item>
                    <Dropdown.Item onClick={sortByPublishDateReverse}>By Youngest</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>

            <Offcanvas show={showFilterCanvas} onHide={handleCloseFilterCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>Filter</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FilterBooksForm setDisplayedBooks={setDisplayedBooks} allBooks={startBookList}
                        setCanvasShow={setShowFilterCanvas} setSortedOption={setSortedOption} />
                </Offcanvas.Body>
            </Offcanvas>


            {
                displayedBooks ? displayedBooks.map(book => {
                    return (
                        <Card className="mb-3" key={book.id}>
                            <Row>
                                <div className="col-md-4">
                                    <Image src={book.image} alt={book.title + " cover"} fluid />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>
                                            {book.title}
                                            {book.categories.map((category, i) => <Badge className="ms-3" bg="secondary" key={i}>{category}</Badge>)}
                                        </Card.Title>
                                        <Card.Text>{book.description}</Card.Text>
                                        <Card.Text><small className="text-muted">Pages: {book.numberOfPages}</small></Card.Text>
                                        <Card.Text><small className="text-muted">Published: {new Date(book.publishDate).toLocaleDateString()}</small></Card.Text>
                                        <Link className="btn btn-primary" to={`/books/${book.id}`}>Details</Link>
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>)
                }) : null
            }
        </div >
    )
};
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