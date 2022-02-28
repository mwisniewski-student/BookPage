import { connect } from "react-redux";
import { useHistory } from "react-router";
import AuthorForm from "./AuthorForm";
import { updateAuthor } from "../../ducks/authors/operations";
import { getAuthorById } from "../../ducks/authors/selectors";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { getOneAuthor } from "../../ducks/authors/operations";
import PropTypes from "prop-types";

const AuthorEdit = ({ updateAuthor, author, getOneAuthor, id }, { t }) => {
  const history = useHistory();

  useEffect(() => {
    if (!author) {
      getOneAuthor(id);
    }
  }, [author]);

  const onSubmit = (author) => {
    updateAuthor(author);
    history.push(`/authors/${author.id}`);
  };

  const mapToInitialValues = (author) => ({
    ...author,
    birthDate: author.birthDate.split("T")[0],
  });

  return (
    <>
      {author ? (
        <Row>
          <h1 className="text-center">{t("Edit Author")}</h1>
          <Col md={{ span: 6, offset: 3 }}>
            <AuthorForm
              initialValues={mapToInitialValues(author)}
              onSubmit={onSubmit}
            />
          </Col>
        </Row>
      ) : (
        <div>{t("No author with given id")}</div>
      )}
    </>
  );
};

AuthorEdit.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const author = getAuthorById(state, id);
  return {
    author,
    id,
  };
};
const mapDispatchToProps = {
  updateAuthor,
  getOneAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorEdit);
