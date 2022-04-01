import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav>
      {numberOfPages ? (
        <BootstrapPagination className="justify-content-center">
          <BootstrapPagination.First key={1} onClick={() => paginate(1)} />
          <BootstrapPagination.Prev
            key={1}
            onClick={() =>
              paginate(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          />
          <BootstrapPagination.Item active>
            {currentPage}
          </BootstrapPagination.Item>
          <BootstrapPagination.Next
            key={2}
            onClick={() =>
              paginate(
                currentPage < numberOfPages ? currentPage + 1 : currentPage
              )
            }
          />
          <BootstrapPagination.Last
            key={3}
            onClick={() => paginate(numberOfPages)}
          />
        </BootstrapPagination>
      ) : null}
    </nav>
  );
};

export default Pagination;
