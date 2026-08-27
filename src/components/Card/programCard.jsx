import "./programCard.css";

import ReactCountryFlag from "react-country-flag";

import {
    FaUsers,
    FaVenusMars,
    FaCalendar,
    FaDollarSign,
    FaClock,
} from "react-icons/fa";

import {
    countries,
    companies,
    brokers,
    users,
} from "../../mockData/data";


const formatMoney = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    if (value >= 1000000) {
        return `${value / 1000000}M`;
    }

    if (value >= 100000) {
        return `${value / 1000}K`;
    }

    return value.toLocaleString("vi-VN");
};


function ProgramCard({ data = [] }) {

    const sortedData = [...data].sort(
        (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
    );


    return (
        <div className="card">

            {sortedData.length === 0 ? (

                <p className="no-data">
                    Không có thông tin!
                </p>

            ) : (

                sortedData.map((program) => {

                    // =================================================
                    // ẢNH ĐẠI DIỆN
                    // =================================================

                    const image =
                        program.programImages?.[0];


                    // =================================================
                    // QUỐC GIA
                    // =================================================

                    const country = countries.find(
                        (item) =>
                            item.id === program.countryId
                    );


                    // =================================================
                    // CÔNG TY
                    // =================================================

                    const company = companies.find(
                        (item) =>
                            item.id === program.companyId
                    );

                    const userCompany = company
                        ? users.find(
                            (item) =>
                                item.id === company.userId
                        )
                        : null;


                    // =================================================
                    // BROKER
                    // =================================================

                    const broker = brokers.find(
                        (item) =>
                            item.id === program.brokerId
                    );

                    const userBroker = broker
                        ? users.find(
                            (item) =>
                                item.id === broker.userId
                        )
                        : null;


                    return (

                        <div
                            key={program.id}
                            className="card-item"
                        >

                            {/* =================================================
                                                IMAGE
                            ================================================= */}

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


                            {/* =================================================
                                                CONTENT
                            ================================================= */}

                            <div className="card-content">

                                <h3>
                                    {program.name}
                                </h3>


                                <div className="info-card">

                                    {/* ================= QUỐC GIA ================= */}

                                    <p>

                                        {country?.code && (

                                            <ReactCountryFlag
                                                countryCode={
                                                    country.code
                                                }
                                                svg
                                                className="flag"
                                            />

                                        )}

                                        {country?.name ||
                                            "Chưa cập nhật"}

                                    </p>


                                    {/* ================= SỐ LƯỢNG ================= */}

                                    {program.recruitmentTarget !==
                                        null &&
                                        program.recruitmentTarget !==
                                            undefined && (

                                            <p>

                                                <FaUsers />

                                                {
                                                    program.recruitmentTarget
                                                }{" "}
                                                vị trí

                                            </p>

                                        )}


                                    {/* ================= GIỚI TÍNH ================= */}

                                    {program.gender && (

                                        <p>

                                            <FaVenusMars />

                                            {program.gender}

                                        </p>

                                    )}


                                    {/* ================= ĐỘ TUỔI ================= */}

                                    {(program.ageMin !==
                                        null ||
                                        program.ageMax !==
                                            null) && (

                                        <p>

                                            <FaCalendar />

                                            {program.ageMin ??
                                                "..."}{" "}
                                            -{" "}
                                            {program.ageMax ??
                                                "..."}{" "}
                                            tuổi

                                        </p>

                                    )}


                                    {/* ================= CHI PHÍ ================= */}

                                    {program.cost !==
                                        null &&
                                        program.cost !==
                                            undefined && (

                                            <p>

                                                <FaDollarSign />

                                                Từ{" "}
                                                {formatMoney(
                                                    program.cost
                                                )}{" "}
                                                {
                                                    program.costCurrency
                                                }

                                            </p>

                                        )}


                                    {/* ================= LƯƠNG ================= */}

                                    {(program.salaryMin !==
                                        null ||
                                        program.salaryMax !==
                                            null) && (

                                        <p>

                                            <FaDollarSign />

                                            {formatMoney(
                                                program.salaryMin
                                            )}{" "}

                                            -{" "}

                                            {formatMoney(
                                                program.salaryMax
                                            )}{" "}

                                            {
                                                program.salaryCurrency
                                            }

                                        </p>

                                    )}


                                    {/* ================= HẠN ĐĂNG KÝ ================= */}

                                    {program.applicationDeadline && (

                                        <p>

                                            <FaClock />

                                            Hạn:{" "}

                                            {new Date(
                                                program.applicationDeadline
                                            ).toLocaleDateString(
                                                "vi-VN"
                                            )}

                                        </p>

                                    )}


                                    {/* ================= TRẠNG THÁI ================= */}

                                    <p>

                                        <FaClock />

                                        {program.status ===
                                        "active"
                                            ? "Đang tuyển"
                                            : "Đã đóng"}

                                    </p>

                                </div>


                                {/* =================================================
                                                COMPANY
                                ================================================= */}

                                <p>

                                    <strong>
                                        Công ty: 
                                    </strong>{" "}

                                    {userCompany?.name ||
                                        "Chưa cập nhật"}

                                </p>


                                {/* =================================================
                                                BROKER
                                ================================================= */}

                                {broker && (

                                    <p>

                                        <strong>
                                            Đơn vị tuyển dụng: 
                                        </strong>{" "}

                                        {userBroker?.name ||
                                            "Chưa cập nhật"}

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