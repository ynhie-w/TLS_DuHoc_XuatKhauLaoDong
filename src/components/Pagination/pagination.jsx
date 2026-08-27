import "./pagination.css";

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        if (currentPage <= 4) {
            return [
                1,
                2,
                3,
                4,
                5,
                "...",
                totalPages,
            ];
        }

        if (currentPage >= totalPages - 3) {
            return [
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    const pageNumbers = getPageNumbers();

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination">
            <button
                className="button arrow"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                &lt;
            </button>

            <div className="pagination-pages">
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                className="pagination-dots"
                                key={`dots-${index}`}
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={`page-${page}`}
                            className={`button ${
                                currentPage === page
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                onPageChange(page)
                            }
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                className="button arrow"
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                &gt;
            </button>
        </div>
    );
}

export default Pagination;