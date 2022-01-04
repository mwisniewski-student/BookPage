import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";
import { Card, Row, Image, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


const BookList = ({ loading, error, books, getBookList }) => {
    useEffect(() => {
        !(books.length) && !error && getBookList();
    }, []);

    const [displayedBooks, setDisplayedBooks] = useState([])
    const [sortedOption, setSortedOption] = useState('')

    useEffect(() => {
        setDisplayedBooks([...books])
    }, [books])

    const sortByNumberOfPages = () => {
        setDisplayedBooks([...displayedBooks.sort((x, y) => y.nuberOgPages - x.numberOfPages)])
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

    return (
        <div>
            <Link to="/books/add">Add book</Link>
            <h3>Book list</h3>
            <DropdownButton variant="secondary" title={`Sortuj: ${sortedOption}`} className="mb-3">
                <Dropdown.Item onClick={sortByNumberOfPages}>Number of pages</Dropdown.Item>
                <Dropdown.Item onClick={sortByNumberOfPagesAscending}>Number of pages(Ascending)</Dropdown.Item>
                <Dropdown.Item onClick={sortAlphabetically}>Alphabetically</Dropdown.Item>
                <Dropdown.Item onClick={sortAlphabeticallyReverse}>Alphabetically(Reverse)</Dropdown.Item>
                <Dropdown.Item onClick={sortByPublishDate}>By Oldest</Dropdown.Item>
                <Dropdown.Item onClick={sortByPublishDateReverse}>By Youngest</Dropdown.Item>
            </DropdownButton>
            {loading ? <div>loading...</div> :
                displayedBooks ? displayedBooks.map(book => {
                    return (
                        <Card className="mb-3" key={book.id}>
                            <Row>
                                <div className="col-md-4">
                                    <Image src={book.image} alt={book.title + " cover"} fluid />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
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
            {error && <div>{error.message}</div>}
        </div >
    )
};
const mapStateToProps = (state) => {
    return {
        books: getAllBooks(state),
        loading: state.loading.loading,
        error: state.loading.error
    };
}
const mapDispatchToProps = {
    getBookList
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);