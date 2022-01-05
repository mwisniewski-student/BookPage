import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow">
            </Spinner>
        </div>
    )
}

export default Loader;