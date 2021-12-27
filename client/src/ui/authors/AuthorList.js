import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllAuthors } from "../../ducks/authors/selectors";
import { getAuthorList } from "../../ducks/authors/operations";
import { Link } from "react-router-dom";


const AuthorList = ({ loading, error, authors, getAuthorList }) => {
    useEffect(() => {
        !(authors.length) && !error && getAuthorList();
    }, []);

    return (
        <div>
            <Link to="/authors/add">Add author</Link>
            <h3>Author list</h3>
            {loading ? <div>loading...</div> :
                authors ? authors.map(author => {
                    return (
                        <div>
                            {author.name}
                        </div>)
                }) : null
            }
            {error && <div>{error.message}</div>}
        </div >
    )
};
const mapStateToProps = (state) => {
    return {
        authors: getAllAuthors(state),
        loading: state.loading.loading,
        error: state.loading.error
    };
}
const mapDispatchToProps = {
    getAuthorList
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);