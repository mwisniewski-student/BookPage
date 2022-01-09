import { Row, Col, Alert } from "react-bootstrap";

const Error = ({ error }) => {
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }} className="mt-3">
                <Alert variant="danger">
                    <Alert.Heading>{error.response ? error.response.err.message : error.message}</Alert.Heading>
                    <p>{error.stack}</p>
                </Alert>
            </Col>
        </Row>
    )
}

export default Error;