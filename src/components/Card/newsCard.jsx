import "./newsCard.css";

function NewsCard({ data = [] }) {
    return (
        <div className="news">
            {data.length === 0 ? (
                <p className="no-data">
                    Không có tin tức!
                </p>
            ) : (
                data.map((news) => (
                    <div
                        key={news.id}
                        className="news-item"
                    >
                        <img
                            className="news-image"
                            src={news.thumbnail}
                            alt={news.title}
                        />

                        <div className="news-content">
                            <span className="news-category">
                                Tin tức
                            </span>

                            <h3>{news.title}</h3>

                            <p className="news-description">
                                {news.content}
                            </p>

                            <div className="news-meta">
                                <span>
                                    {new Date(
                                        news.createdAt
                                    ).toLocaleDateString("vi-VN")}
                                </span>

                                <span>
                                    {news.status === "published"
                                        ? "Đã xuất bản"
                                        : "Bản nháp"}
                                </span>
                            </div>

                            <button className="button">
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default NewsCard;