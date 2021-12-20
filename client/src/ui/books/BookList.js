
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";

const UserList = ({ loading, error, books, getBookList }) => {
    useEffect(() => {
        !(books.length) && !error && getBookList();
    }, []);

    return (
        <div>
            <h3>Book list</h3>
            {loading ? <div>loading...</div> :
                books ? books.map(book => {
                    return (
                        <div>
                            {book.title}
                        </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);