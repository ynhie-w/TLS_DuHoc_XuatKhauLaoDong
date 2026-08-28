import { useState } from "react";
import "./auth.css";

export default function Register({ onClose, onLogin, onRegisterSuccess }) {

    const [role, setRole] = useState("student");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [studentData, setStudentData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        identityNumber: "",
        address: "",
        educationLevel: "",
    });

    const [brokerData, setBrokerData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        identityNumber: "",
        address: "",
        licenseNumber: "",
        licenseIssuedDate: "",
        experience: "",
        companyName: "",
    });

    const [companyData, setCompanyData] = useState({
        companyName: "",
        businessNumber: "",
        representativeName: "",
        representativePosition: "",
        address: "",
        website: "",
        businessField: "",
        licenseNumber: "",
    });

    const roleName = {
        student: "Học viên",
        broker: "Môi giới",
        company: "Công ty",
    };

    const handleStudentChange = (e) => {
        const { name, value } = e.target;

        setStudentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBrokerChange = (e) => {
        const { name, value } = e.target;

        setBrokerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;

        setCompanyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validatePhone = (phoneNumber) => {
        const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateIdentityNumber = (identityNumber) => {
        return /^[0-9]{12}$/.test(identityNumber);
    };

    const validateBusinessNumber = (businessNumber) => {
        return /^[0-9]{10,13}$/.test(businessNumber);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email.trim()) {
            alert("Vui lòng nhập email!");
            return;
        }

        if (!validatePhone(phone.trim())) {
            alert("Số điện thoại không hợp lệ!");
            return;
        }

        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

 
        if (role === "student") {
            if (!studentData.fullName.trim()) {
                alert("Vui lòng nhập họ và tên!");
                return;
            }

            if (!studentData.dateOfBirth) {
                alert("Vui lòng nhập ngày sinh!");
                return;
            }

            if (!studentData.gender) {
                alert("Vui lòng chọn giới tính!");
                return;
            }

            if (!validateIdentityNumber(studentData.identityNumber.trim())) {
                alert("Số CCCD phải gồm 12 chữ số!");
                return;
            }

            if (!studentData.address.trim()) {
                alert("Vui lòng nhập địa chỉ!");
                return;
            }

            if (!studentData.educationLevel) {
                alert("Vui lòng chọn trình độ học vấn!");
                return;
            }
        }

        if (role === "broker") {
            if (!brokerData.fullName.trim()) {
                alert("Vui lòng nhập họ và tên!");
                return;
            }

            if (!brokerData.dateOfBirth) {
                alert("Vui lòng nhập ngày sinh!");
                return;
            }

            if (!brokerData.gender) {
                alert("Vui lòng chọn giới tính!");
                return;
            }

            if (!validateIdentityNumber(brokerData.identityNumber.trim())) {
                alert("Số CCCD phải gồm 12 chữ số!");
                return;
            }

            if (!brokerData.address.trim()) {
                alert("Vui lòng nhập địa chỉ!");
                return;
            }

            if (!brokerData.licenseNumber.trim()) {
                alert("Vui lòng nhập số giấy phép / chứng chỉ!");
                return;
            }

            if (!brokerData.licenseIssuedDate) {
                alert("Vui lòng nhập ngày cấp!");
                return;
            }

            if (!brokerData.experience.trim()) {
                alert("Vui lòng nhập kinh nghiệm!");
                return;
            }

            if (
                isNaN(Number(brokerData.experience)) ||
                Number(brokerData.experience) < 0
            ) {
                alert("Số năm kinh nghiệm không hợp lệ!");
                return;
            }
        }

        if (role === "company") {
            if (!companyData.companyName.trim()) {
                alert("Vui lòng nhập tên công ty!");
                return;
            }

            if (!validateBusinessNumber(companyData.businessNumber.trim())) {
                alert(
                    "Mã số doanh nghiệp phải gồm từ 10 đến 13 chữ số!"
                );
                return;
            }

            if (!companyData.representativeName.trim()) {
                alert("Vui lòng nhập tên người đại diện!");
                return;
            }

            if (!companyData.representativePosition.trim()) {
                alert("Vui lòng nhập chức vụ!");
                return;
            }

            if (!companyData.address.trim()) {
                alert("Vui lòng nhập địa chỉ công ty!");
                return;
            }

            if (!companyData.businessField.trim()) {
                alert("Vui lòng nhập lĩnh vực hoạt động!");
                return;
            }

            if (!companyData.licenseNumber.trim()) {
                alert("Vui lòng nhập số giấy phép kinh doanh!");
                return;
            }
        }


        let data = {
            role,
            email: email.trim(),
            phone: phone.trim(),
            password,
        };


        if (role === "student") {
            data = {
                ...data,

                name: studentData.fullName.trim(),
                address: studentData.address.trim(),

                profile: {
                    dateOfBirth: studentData.dateOfBirth,
                    gender: studentData.gender,
                    identityNumber: studentData.identityNumber.trim(),
                    educationLevelId: Number(
                        studentData.educationLevel
                    ),
                },
            };
        }

        if (role === "broker") {
            data = {
                ...data,

                name: brokerData.fullName.trim(),
                address: brokerData.address.trim(),

                profile: {
                    dateOfBirth: brokerData.dateOfBirth,
                    gender: brokerData.gender,
                    identityNumber: brokerData.identityNumber.trim(),
                    licenseNumber: brokerData.licenseNumber.trim(),
                    licenseIssuedDate: brokerData.licenseIssuedDate,
                    experienceYears: Number(
                        brokerData.experience
                    ),
                    companyName:
                        brokerData.companyName.trim() || null,
                },
            };
        }


        if (role === "company") {
            data = {
                ...data,

                // users.name
                name: companyData.companyName.trim(),

                // users.address
                address: companyData.address.trim(),

                profile: {
                    representativeName:
                        companyData.representativeName.trim(),

                    representativePosition:
                        companyData.representativePosition.trim(),

                    businessCode:
                        companyData.businessNumber.trim(),

                    businessField:
                        companyData.businessField.trim(),

                    licenseNumber:
                        companyData.licenseNumber.trim(),

                    website:
                        companyData.website.trim() || null,
                },
            };
        }


        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.message ||
                        "Đăng ký thất bại!"
                );
                return;
            }


            alert(
                `Đăng ký tài khoản ${roleName[role]} thành công!`
            );

            console.log("REGISTER SUCCESS:", result);

            // Không lưu password / account vào localStorage.
            // Chỉ báo cho component cha biết đăng ký thành công.
            onRegisterSuccess?.(result);

        } catch (error) {
            console.error(
                "REGISTER ERROR:",
                error
            );

            alert(
                "Không thể kết nối đến server!"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="register-box">

            <div className="auth-brand">
                <h1>HECT</h1>
                <h2>Hệ thống Du học & Việc làm</h2>
            </div>

            <div className="auth-tabs">

                <button
                    type="button"
                    onClick={onLogin}
                >
                    ĐĂNG NHẬP
                </button>

                <button
                    className="active"
                    type="button"
                >
                    ĐĂNG KÝ
                </button>

                <button
                    type="button"
                    onClick={onClose}
                >
                    THOÁT
                </button>

            </div>

            <div className="auth-intro">

                <div className="intro-item">
                    <h2>KHÁM PHÁ CƠ HỘI DU HỌC</h2>
                    <h3>
                        Tìm hiểu chương trình phù hợp
                        và bắt đầu hành trình tương lai.
                    </h3>
                </div>

                <div className="intro-item">
                    <h2>TÌM KIẾM CƠ HỘI VIỆC LÀM</h2>
                    <h3>
                        Khám phá những cơ hội việc làm
                        ở nước ngoài phù hợp.
                    </h3>
                </div>

                <div className="intro-item">
                    <h2>ĐỊNH HƯỚNG CÙNG AI</h2>
                    <h3>
                        Nhận gợi ý thông minh để lựa chọn
                        quốc gia phù hợp.
                    </h3>
                </div>

            </div>

            <div className="auth-form">

                <h2>Đăng ký</h2>

                <p className="login-description">
                    Tạo tài khoản{" "}
                    <strong>
                        {roleName[role]}
                    </strong>{" "}
                    để bắt đầu hành trình.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* ==================================================
                        COMMON
                    ================================================== */}

                    <div className="form-group">
                        <label>Loại tài khoản</label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >
                            <option value="student">
                                Học viên
                            </option>

                            <option value="broker">
                                Môi giới
                            </option>

                            <option value="company">
                                Công ty
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>

                        <input
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>

                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>

                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    {/* ==================================================
                        STUDENT
                    ================================================== */}

                    {role === "student" && (
                        <>
                            <div className="form-group">
                                <label>Họ và tên</label>

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    value={
                                        studentData.fullName
                                    }
                                    onChange={
                                        handleStudentChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Ngày sinh</label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        studentData.dateOfBirth
                                    }
                                    onChange={
                                        handleStudentChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Giới tính</label>

                                <select
                                    name="gender"
                                    value={
                                        studentData.gender
                                    }
                                    onChange={
                                        handleStudentChange
                                    }
                                    required
                                >
                                    <option value="">
                                        -- Chọn giới tính --
                                    </option>

                                    <option value="male">
                                        Nam
                                    </option>

                                    <option value="female">
                                        Nữ
                                    </option>

                                    <option value="other">
                                        Khác
                                    </option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Số CCCD</label>

                                <input
                                    type="text"
                                    name="identityNumber"
                                    placeholder="Nhập số CCCD 12 số"
                                    maxLength="12"
                                    value={
                                        studentData.identityNumber
                                    }
                                    onChange={
                                        handleStudentChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Địa chỉ</label>

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                    value={
                                        studentData.address
                                    }
                                    onChange={
                                        handleStudentChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Trình độ học vấn
                                </label>

                                <select
                                    name="educationLevel"
                                    value={
                                        studentData.educationLevel
                                    }
                                    onChange={
                                        handleStudentChange
                                    }
                                    required
                                >
                                    <option value="">
                                        -- Chọn trình độ --
                                    </option>

                                    <option value="2">
                                        THPT
                                    </option>

                                    <option value="4">
                                        Cao đẳng
                                    </option>

                                    <option value="5">
                                        Đại học
                                    </option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* ==================================================
                        BROKER
                    ================================================== */}

                    {role === "broker" && (
                        <>
                            <div className="form-group">
                                <label>Họ và tên</label>

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    value={
                                        brokerData.fullName
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Ngày sinh</label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        brokerData.dateOfBirth
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Giới tính</label>

                                <select
                                    name="gender"
                                    value={
                                        brokerData.gender
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                >
                                    <option value="">
                                        -- Chọn giới tính --
                                    </option>

                                    <option value="male">
                                        Nam
                                    </option>

                                    <option value="female">
                                        Nữ
                                    </option>

                                    <option value="other">
                                        Khác
                                    </option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Số CCCD</label>

                                <input
                                    type="text"
                                    name="identityNumber"
                                    placeholder="Nhập số CCCD 12 số"
                                    maxLength="12"
                                    value={
                                        brokerData.identityNumber
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Địa chỉ</label>

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                    value={
                                        brokerData.address
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Số giấy phép / Chứng chỉ
                                </label>

                                <input
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="Nhập số giấy phép"
                                    value={
                                        brokerData.licenseNumber
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Ngày cấp giấy phép
                                </label>

                                <input
                                    type="date"
                                    name="licenseIssuedDate"
                                    value={
                                        brokerData.licenseIssuedDate
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Kinh nghiệm (năm)
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    min="0"
                                    placeholder="Nhập số năm kinh nghiệm"
                                    value={
                                        brokerData.experience
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Tên công ty (nếu có)
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Nhập tên công ty"
                                    value={
                                        brokerData.companyName
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                />
                            </div>
                        </>
                    )}

                    {/* ==================================================
                        COMPANY
                    ================================================== */}

                    {role === "company" && (
                        <>
                            <div className="form-group">
                                <label>Tên công ty</label>

                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Nhập tên công ty"
                                    value={
                                        companyData.companyName
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Mã số doanh nghiệp
                                </label>

                                <input
                                    type="text"
                                    name="businessNumber"
                                    placeholder="Nhập 10 - 13 chữ số"
                                    maxLength="13"
                                    value={
                                        companyData.businessNumber
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Tên người đại diện
                                </label>

                                <input
                                    type="text"
                                    name="representativeName"
                                    placeholder="Nhập tên người đại diện"
                                    value={
                                        companyData.representativeName
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Chức vụ người đại diện
                                </label>

                                <input
                                    type="text"
                                    name="representativePosition"
                                    placeholder="Ví dụ: Giám đốc"
                                    value={
                                        companyData.representativePosition
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Địa chỉ công ty
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ trụ sở"
                                    value={
                                        companyData.address
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Website (nếu có)
                                </label>

                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://example.com"
                                    value={
                                        companyData.website
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Lĩnh vực hoạt động
                                </label>

                                <input
                                    type="text"
                                    name="businessField"
                                    placeholder="Nhập lĩnh vực hoạt động"
                                    value={
                                        companyData.businessField
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Số giấy phép kinh doanh
                                </label>

                                <input
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="Nhập số giấy phép"
                                    value={
                                        companyData.licenseNumber
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* ==================================================
                        SUBMIT
                    ================================================== */}

                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Đang đăng ký..."
                            : "Đăng ký ngay"}
                    </button>

                </form>
            </div>
        </div>
    );
}