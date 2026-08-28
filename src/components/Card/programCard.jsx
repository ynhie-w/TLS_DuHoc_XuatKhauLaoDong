
import "./programCard.css";
import ReactCountryFlag from "react-country-flag";
import {
    FaUsers,
    FaVenusMars,
    FaCalendar,
    FaDollarSign,
    FaClock,
} from "react-icons/fa";

const formatMoney = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    const num = Number(value); 

    if (num >= 1000000) {
        return `${num / 1000000}M`;
    }

    if (num >= 10000) {
        return `${num / 1000}K`;
    }

    return num.toLocaleString("vi-VN");
};

function ProgramCard({ data = [] }) {
    const sortedData = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="card">
            {sortedData.length === 0 ? (
                <p className="no-data">Không có thông tin!</p>
            ) : (
                sortedData.map((program) => {
                    // =================================================
                    // 1. ÁNH ĐẠI DIỆN
                    // =================================================
                    const image = program.programImages?.[0];

                    // =================================================
                    // 2. DỮ LIỆU TỪ API INCLUDED (Không cần dùng .find nữa)
                    // =================================================
                    const country = program.countries;
                    const companyName = program.companies?.users?.name;
                    const brokerName = program.brokers?.users?.name;

                    return (
                        <div key={program.id} className="card-item">
                            {/* IMAGE */}
                            <div className="card-image-wrapper">
                                <img
                                    className="card-image"
                                    src={
                                        image ||
                                        "/images/programs/default.png"
                                    }
                                    alt={program.name}
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="card-content">
                                <h3>{program.name}</h3>

                                <div className="info-card">
                                    {/* QUỐC GIA */}
                                    <p>
                                        {country?.code && (
                                            <ReactCountryFlag
                                                countryCode={country.code}
                                                svg
                                                className="flag"
                                            />
                                        )}
                                        {country?.name || "Chưa cập nhật"}
                                    </p>

                                    {/* SỐ LƯỢNG */}
                                    {program.recruitmentTarget !== null &&
                                        program.recruitmentTarget !== undefined && (
                                            <p>
                                                <FaUsers />
                                                {program.recruitmentTarget} vị trí
                                            </p>
                                        )}

                                    {/* GIỚI TÍNH */}
                                    {program.gender && (
                                        <p>
                                            <FaVenusMars />
                                            {program.gender}
                                        </p>
                                    )}

                                    {/* ĐỘ TUỔI */}
                                    {(program.ageMin !== null ||
                                        program.ageMax !== null) && (
                                        <p>
                                            <FaCalendar />
                                            {program.ageMin ?? "..."} -{" "}
                                            {program.ageMax ?? "..."} tuổi
                                        </p>
                                    )}

                                    {/* CHI PHÍ */}
                                    {program.cost !== null &&
                                        program.cost !== undefined && (
                                            <p>
                                                <FaDollarSign />
                                                Từ {formatMoney(program.cost)}{" "}
                                                {program.costCurrency}
                                            </p>
                                        )}

                                    

                                    {/* HẠN ĐĂNG KÝ */}
                                    {program.applicationDeadline && (
                                        <p>
                                            <FaClock />
                                            Hạn:{" "}
                                            {new Date(
                                                program.applicationDeadline
                                            ).toLocaleDateString("vi-VN")}
                                        </p>
                                    )}

                                    {/* TRẠNG THÁI */}
                                    <p>
                                        <FaClock />
                                        {program.status === "active"
                                            ? "Đang tuyển"
                                            : "Đã đóng"}
                                    </p>
                                </div>

                                {/* LƯƠNG */}
                                    {(program.salaryMin !== null ||
                                        program.salaryMax !== null) && (
                                        <p><strong>Lương:&nbsp;</strong>
                                            <FaDollarSign />
                                            {formatMoney(program.salaryMin)} -{" "}
                                            {formatMoney(program.salaryMax)}{" "}
                                            {program.salaryCurrency}/tháng
                                        </p>
                                    )}               
                                {/* CÔNG TY */}
                                <p>
                                <strong>Công ty:&nbsp;</strong>
                                {" "+companyName || "Chưa cập nhật"}
                            </p>

                                {/* BROKER (Nếu có) */}
                                {program.brokers && (
                                    <p>
                                        <strong>Đơn vị tuyển dụng:&nbsp;</strong>
                                        {brokerName || "Chưa cập nhật"}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ProgramCard;