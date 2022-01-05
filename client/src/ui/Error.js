import { Row, Col, Alert } from "react-bootstrap";

const Error = props => {
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }} className="mt-3">
                <Alert variant="danger">
                    <Alert.Heading>{props.error.response ? props.error.response.err.message : props.error.message}</Alert.Heading>
                    <p>{props.error.stack}</p>
                </Alert>
            </Col>
        </Row>
    )
}

export default Error;