import "./newsCard.css";

function NewsCard({ data = [] }) {
    return (
        <div className="news">
            {data.length === 0 ? (
                <p className="no-data">
                    Không có tin tức!
                </p>
            ) : (
                data.map((item) => (
                    <div
                        key={item.id}
                        className="news-item"
                    >
                        <img
                            className="news-image"
                            src={item.thumbnail}
                            alt={item.title}
                        />

                        <div className="news-content">
                            <span className="news-category">
                                Tin tức
                            </span>

                            <h3>{item.title}</h3>

                            <p className="news-description">
                                {item.content}
                            </p>

                            <div className="news-meta">
                                <span>
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString("vi-VN")}
                                </span>

                                <span>
                                    {item.status === "published"
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