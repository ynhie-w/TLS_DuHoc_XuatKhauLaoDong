import { useState } from "react";

import { news } from "../../../mockData/data";

import NewsCard from "../../../components/Card/newsCard";
import Pagination from "../../../components/Pagination/pagination";

import "./news.css";

function News({ newsPerPage = 4 }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        news.length / newsPerPage
    );

    const startIndex =
        (currentPage - 1) * newsPerPage;

    const currentNews = news.slice(
        startIndex,
        startIndex + newsPerPage
    );

    return (
        <div className="news-page">

            <NewsCard data={currentNews} />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

        </div>
    );
}

export default News;