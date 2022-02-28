import { connect } from "react-redux";
import { useHistory } from "react-router";
import BookForm from "./BookForm";
import { createBook } from "../../ducks/books/operations";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const BookAdd = ({ createBook }, { t }) => {
  const history = useHistory();
  const initialValues = {
    title: "",
    description: "No description",
    publishDate: new Date().toISOString().split("T")[0],
    image: "",
    authorsIds: [],
    categories: [],
    numberOfPages: 1,
  };

  const onSubmit = (book) => {
    createBook(book).then((action) => {
      const bookId = Object.keys(action.payload.books)[0];
      history.push(`/books/${bookId}`);
    });
  };
  return (
    <Row>
      <h1 className="text-center">{t("Add Book")}</h1>
      <Col md={{ span: 6, offset: 3 }}>
        <BookForm initialValues={initialValues} onSubmit={onSubmit} />
      </Col>
    </Row>
  );
};

BookAdd.contextTypes = {
  t: PropTypes.func,
};

const mapDispatchToProps = {
  createBook,
};

export default connect(undefined, mapDispatchToProps)(BookAdd);
