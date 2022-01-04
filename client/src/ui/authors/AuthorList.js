import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllAuthors } from "../../ducks/authors/selectors";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";
import { getAuthorList } from "../../ducks/authors/operations";
import { Link } from "react-router-dom";
import { Card, Row, Image, DropdownButton, Dropdown } from "react-bootstrap";


const AuthorList = ({ loading, error, authors, getAuthorList, books, getBookList }) => {
    useEffect(() => {
        !(authors.length) && !error && getAuthorList();
        books.length === 0 && !error && getBookList();
    }, []);

    const getNumberOfBooks = authorId => {
        return books.filter(book => book.authorsIds.includes(authorId)).length
    }

    const [displayedAuthors, setDisplayedAuthors] = useState([])
    const [sortedOption, setSortedOption] = useState('')

    useEffect(() => {
        setDisplayedAuthors([...authors])
    }, [authors])

    const sortByNumberOfBooks = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => getNumberOfBooks(y.id) - getNumberOfBooks(x.id))])
        setSortedOption('Number Of Books')
    }

    const sortByNumberOfBooksAscending = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => getNumberOfBooks(x.id) - getNumberOfBooks(y.id))])
        setSortedOption('Number Of Books(Ascending)')
    }

    const sortAlphabetically = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => x.name.toLowerCase().localeCompare(y.name.toLowerCase()))])
        setSortedOption('Alphabetically')
    }
    const sortAlphabeticallyReverse = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => y.name.toLowerCase().localeCompare(x.name.toLowerCase()))])
        setSortedOption('Alphabetically(Reverse)')
    }

    const sortByBirthDate = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => new Date(x.birthDate) - new Date(y.birthDate))])
        setSortedOption("By Oldest")
    }

    const sortByBirthDateReverse = () => {
        setDisplayedAuthors([...displayedAuthors.sort((x, y) => new Date(y.birthDate) - new Date(x.birthDate))])
        setSortedOption("By Youngest")
    }

    return (
        <div>
            <Link to="/authors/add">Add author</Link>
            <h3>Author list</h3>
            <DropdownButton variant="secondary" title={`Sortuj: ${sortedOption}`} className="mb-3">
                <Dropdown.Item onClick={sortByNumberOfBooks}>Number of books</Dropdown.Item>
                <Dropdown.Item onClick={sortByNumberOfBooksAscending}>Number of books(Ascending)</Dropdown.Item>
                <Dropdown.Item onClick={sortAlphabetically}>Alphabetically</Dropdown.Item>
                <Dropdown.Item onClick={sortAlphabeticallyReverse}>Alphabetically(Reverse)</Dropdown.Item>
                <Dropdown.Item onClick={sortByBirthDate}>By Oldest</Dropdown.Item>
                <Dropdown.Item onClick={sortByBirthDateReverse}>By Youngest</Dropdown.Item>
            </DropdownButton>
            {loading ? <div>loading...</div> :
                displayedAuthors ? displayedAuthors.map(author => {
                    return (
                        <Card className="mb-3" key={author.id}>
                            <Row>
                                <div className="col-md-4">
                                    <Image src={author.image} alt={author.name + " photo"} thumbnail />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{author.name}</Card.Title>
                                        <Card.Text>{author.description}</Card.Text>
                                        <Card.Text><small className="text-muted">Number of books: {getNumberOfBooks(author.id)}</small></Card.Text>
                                        <Card.Text><small className="text-muted">Birth Date: {new Date(author.birthDate).toLocaleDateString()}</small></Card.Text>
                                        <Link className="btn btn-primary" to={`/authors/${author.id}`}>Details</Link>
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
        authors: getAllAuthors(state),
        books: getAllBooks(state),
        loading: state.loading.loading,
        error: state.loading.error
    };
}
const mapDispatchToProps = {
    getAuthorList,
    getBookList
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);