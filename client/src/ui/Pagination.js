import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1);

    return (
        <nav>
            <BootstrapPagination className='justify-content-center'>
                {pageNumbers.map(number => (
                    <BootstrapPagination.Item key={number} onClick={() => paginate(number)}>
                        {number}
                    </BootstrapPagination.Item>
                ))}
            </BootstrapPagination>
        </nav>
    );
};

export default Pagination;