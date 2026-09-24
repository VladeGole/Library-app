import { useState } from "react";

export const Pagination: React.FC<{ currentPage: number, totalPages: number, paginate: any }> = (props) => {

    const pageNumbers: number[] = [];

    const startPage: number = Math.max(1, props.currentPage - 2);
    const endPage: number = Math.min(props.totalPages, props.currentPage + 2);

    for (let i: number = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paginate(1)}>
                    <button className="page-link">First page</button>
                </li>
                {pageNumbers.map((pageNumbers) => (
                    <li  className={"page-item " + (pageNumbers === props.currentPage ? "active" : "")} key={pageNumbers} onClick={() => props.paginate(pageNumbers)}>
                        <button className="page-link">{pageNumbers}</button>
                    </li>
                ))}
                <li className="page-item" onClick={() => props.paginate(props.totalPages)}>
                    <button className="page-link">Last page</button>
                </li>
            </ul>
        </nav>
    );
}