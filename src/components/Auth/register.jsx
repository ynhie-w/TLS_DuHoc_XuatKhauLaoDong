import { useState } from "react";
import "./auth.css";

export default function Register({
    onClose,
    onLogin,
    onRegisterSuccess,
}) {
    // ======================================================
    // ROLE
    // ======================================================

    const [role, setRole] = useState("student");

    // ======================================================
    // COMMON
    // ======================================================

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // ======================================================
    // STUDENT
    // ======================================================

    const [studentData, setStudentData] = useState({
        name: "",
        dateOfBirth: "",
        gender: "",
        identityNumber: "",
        address: "",
        educationLevel: "",
    });

    // ======================================================
    // BROKER
    // ======================================================

    const [brokerData, setBrokerData] = useState({
        name: "",
        dateOfBirth: "",
        gender: "",
        identityNumber: "",
        address: "",
        licenseNumber: "",
        licenseIssuedDate: "",
        experienceYears: "",
        companyName: "",
    });

    // ======================================================
    // COMPANY
    // ======================================================

    const [companyData, setCompanyData] = useState({
        companyName: "",
        businessCode: "",
        representativeName: "",
        representativePosition: "",
        address: "",
        website: "",
        businessField: "",
        licenseNumber: "",
        licenseIssuedDate: "",
    });

    // ======================================================
    // ROLE NAME
    // ======================================================

    const roleName = {
        student: "Học viên",
        broker: "Môi giới",
        company: "Công ty",
    };

    // ======================================================
    // HANDLE STUDENT
    // ======================================================

    const handleStudentChange = (e) => {
        const { name, value } = e.target;

        setStudentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // HANDLE BROKER
    // ======================================================

    const handleBrokerChange = (e) => {
        const { name, value } = e.target;

        setBrokerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // HANDLE COMPANY
    // ======================================================

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;

        setCompanyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ======================================================
    // VALIDATION
    // ======================================================

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

    // ======================================================
    // HANDLE SUBMIT
    // ======================================================

    const handleSubmit = (e) => {
        e.preventDefault();

        // ==================================================
        // COMMON VALIDATION
        // ==================================================

        if (!email.trim()) {
            alert("Vui lòng nhập email!");
            return;
        }

        if (!validatePhone(phone)) {
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

        // ==================================================
        // STUDENT
        // ==================================================

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

            if (
                !validateIdentityNumber(
                    studentData.identityNumber
                )
            ) {
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

            const account = {
                role: "student",

                email: email.trim(),
                phone: phone.trim(),
                password,

                profile: {
                    fullName:
                        studentData.fullName.trim(),

                    dateOfBirth:
                        studentData.dateOfBirth,

                    gender:
                        studentData.gender,

                    identityNumber:
                        studentData.identityNumber.trim(),

                    address:
                        studentData.address.trim(),

                    educationLevel:
                        studentData.educationLevel,
                },
            };

            console.log(
                "Tài khoản học viên:",
                account
            );

            alert(
                "Đăng ký tài khoản học viên thành công!"
            );

            localStorage.setItem(
                "account",
                JSON.stringify(account)
            );

            localStorage.setItem(
                "role",
                "student"
            );

            onRegisterSuccess?.(account);

            return;
        }

        // ==================================================
        // BROKER
        // ==================================================

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

            if (
                !validateIdentityNumber(
                    brokerData.identityNumber
                )
            ) {
                alert("Số CCCD phải gồm 12 chữ số!");
                return;
            }

            if (!brokerData.address.trim()) {
                alert("Vui lòng nhập địa chỉ!");
                return;
            }

            if (!brokerData.licenseNumber.trim()) {
                alert(
                    "Vui lòng nhập số giấy phép / chứng chỉ!"
                );
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

            const account = {
                role: "broker",

                email: email.trim(),
                phone: phone.trim(),
                password,

                profile: {
                    fullName:
                        brokerData.fullName.trim(),

                    dateOfBirth:
                        brokerData.dateOfBirth,

                    gender:
                        brokerData.gender,

                    identityNumber:
                        brokerData.identityNumber.trim(),

                    address:
                        brokerData.address.trim(),

                    licenseNumber:
                        brokerData.licenseNumber.trim(),

                    licenseIssuedDate:
                        brokerData.licenseIssuedDate,

                    experience:
                        brokerData.experience.trim(),

                    companyName:
                        brokerData.companyName.trim(),
                },
            };

            console.log(
                "Tài khoản môi giới:",
                account
            );

            alert(
                "Đăng ký tài khoản môi giới thành công!"
            );

            localStorage.setItem(
                "account",
                JSON.stringify(account)
            );

            localStorage.setItem(
                "role",
                "broker"
            );

            onRegisterSuccess?.(account);

            return;
        }

        // ==================================================
        // COMPANY
        // ==================================================

        if (role === "company") {
            if (!companyData.companyName.trim()) {
                alert("Vui lòng nhập tên công ty!");
                return;
            }

            if (
                !validateBusinessNumber(
                    companyData.businessNumber
                )
            ) {
                alert(
                    "Mã số doanh nghiệp phải gồm từ 10 đến 13 chữ số!"
                );
                return;
            }

            if (
                !companyData.representativeName.trim()
            ) {
                alert(
                    "Vui lòng nhập tên người đại diện!"
                );
                return;
            }

            if (
                !companyData.representativePosition.trim()
            ) {
                alert("Vui lòng nhập chức vụ!");
                return;
            }

            if (!companyData.address.trim()) {
                alert(
                    "Vui lòng nhập địa chỉ công ty!"
                );
                return;
            }

            if (!companyData.businessField.trim()) {
                alert(
                    "Vui lòng nhập lĩnh vực hoạt động!"
                );
                return;
            }

            if (!companyData.licenseNumber.trim()) {
                alert(
                    "Vui lòng nhập số giấy phép kinh doanh!"
                );
                return;
            }

            if (!companyData.licenseIssuedDate) {
                alert(
                    "Vui lòng nhập ngày cấp giấy phép!"
                );
                return;
            }

            const account = {
                role: "company",

                email: email.trim(),
                phone: phone.trim(),
                password,

                profile: {
                    companyName:
                        companyData.companyName.trim(),

                    businessNumber:
                        companyData.businessNumber.trim(),

                    representativeName:
                        companyData.representativeName.trim(),

                    representativePosition:
                        companyData.representativePosition.trim(),

                    address:
                        companyData.address.trim(),

                    website:
                        companyData.website.trim(),

                    businessField:
                        companyData.businessField.trim(),

                    licenseNumber:
                        companyData.licenseNumber.trim(),

                    licenseIssuedDate:
                        companyData.licenseIssuedDate,
                },
            };

            console.log(
                "Tài khoản công ty:",
                account
            );

            alert(
                "Đăng ký tài khoản công ty thành công!"
            );

            localStorage.setItem(
                "account",
                JSON.stringify(account)
            );

            localStorage.setItem(
                "role",
                "company"
            );

            onRegisterSuccess?.(account);

            return;
        }
    };

    // ======================================================
    // JSX
    // ======================================================

    return (
        <div className="register-box">

            {/* ================================================= */}
            {/* BRAND */}
            {/* ================================================= */}

            <div className="auth-brand">
                <h1>ánnfjnf</h1>

                <h2>
                    ánnfjnfánnfjnf
                </h2>
            </div>

            {/* ================================================= */}
            {/* TABS */}
            {/* ================================================= */}

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

            {/* ================================================= */}
            {/* INTRO */}
            {/* ================================================= */}

            <div className="auth-intro">

                <div className="intro-item">

                    <h2>
                        KHÁM PHÁ CƠ HỘI DU HỌC
                    </h2>

                    <h3>
                        Tìm hiểu chương trình phù hợp
                        và bắt đầu hành trình tương lai
                        của bạn.
                    </h3>

                </div>

                <div className="intro-item">

                    <h2>
                        TÌM KIẾM CƠ HỘI VIỆC LÀM
                    </h2>

                    <h3>
                        Khám phá những cơ hội việc làm
                        ở nước ngoài phù hợp với bạn.
                    </h3>

                </div>

                <div className="intro-item">

                    <h2>
                        ĐỊNH HƯỚNG CÙNG AI
                    </h2>

                    <h3>
                        Nhận gợi ý thông minh để lựa chọn
                        quốc gia và chương trình phù hợp.
                    </h3>

                </div>

            </div>

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <div className="auth-form">

                <h2>Đăng ký</h2>

                <p className="login-description">

                    Tạo tài khoản{" "}

                    <strong>
                        {roleName[role]}
                    </strong>{" "}

                    để bắt đầu hành trình của bạn.

                </p>

                <form onSubmit={handleSubmit}>

                    {/* ================================================= */}
                    {/* ROLE */}
                    {/* ================================================= */}

                    <div className="form-group">

                        <label>
                            Loại tài khoản
                        </label>

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

                    {/* ================================================= */}
                    {/* STUDENT */}
                    {/* ================================================= */}

                    {role === "student" && (
                        <>

                            <div className="form-group">

                                <label>
                                    Họ và tên
                                </label>

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

                                <label>
                                    Ngày sinh
                                </label>

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

                                <label>
                                    Giới tính
                                </label>

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

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Số điện thoại
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Số CCCD
                                </label>

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

                                <label>
                                    Địa chỉ
                                </label>

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

                    {/* ================================================= */}
                    {/* BROKER */}
                    {/* ================================================= */}

                    {role === "broker" && (
                        <>

                            <div className="form-group">

                                <label>
                                    Họ và tên
                                </label>

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

                                <label>
                                    Ngày sinh
                                </label>

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

                                <label>
                                    Giới tính
                                </label>

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

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Số điện thoại
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Số CCCD
                                </label>

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

                                <label>
                                    Địa chỉ
                                </label>

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
                                    Số giấy phép / chứng chỉ
                                </label>

                                <input
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="Nhập số giấy phép hoặc chứng chỉ"
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
                                    Ngày cấp
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
                                    Kinh nghiệm
                                </label>

                                <textarea
                                    name="experience"
                                    placeholder="Mô tả kinh nghiệm làm việc"
                                    value={
                                        brokerData.experience
                                    }
                                    onChange={
                                        handleBrokerChange
                                    }
                                    rows="4"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Đơn vị / Công ty đang làm việc
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Nhập tên đơn vị hoặc công ty"
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

                    {/* ================================================= */}
                    {/* COMPANY */}
                    {/* ================================================= */}

                    {role === "company" && (
                        <>

                            <div className="form-group">

                                <label>
                                    Tên công ty
                                </label>

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
                                    placeholder="Nhập mã số doanh nghiệp"
                                    value={
                                        companyData.businessNumber
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    maxLength="13"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Người đại diện
                                </label>

                                <input
                                    type="text"
                                    name="representativeName"
                                    placeholder="Nhập họ và tên người đại diện"
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
                                    Email công ty
                                </label>

                                <input
                                    type="email"
                                    placeholder="Nhập email công ty"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Số điện thoại
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Nhập số điện thoại công ty"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Địa chỉ trụ sở
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ công ty"
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
                                    Website
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
                                    placeholder="Nhập số giấy phép kinh doanh"
                                    value={
                                        companyData.licenseNumber
                                    }
                                    onChange={
                                        handleCompanyChange
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
                                        companyData.licenseIssuedDate
                                    }
                                    onChange={
                                        handleCompanyChange
                                    }
                                    required
                                />

                            </div>

                        </>
                    )}

                    {/* ================================================= */}
                    {/* PASSWORD */}
                    {/* ================================================= */}

                    <div className="form-group">

                        <label>
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            minLength="6"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Xác nhận mật khẩu
                        </label>

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

                    {/* ================================================= */}
                    {/* SUBMIT */}
                    {/* ================================================= */}

                    <button
                        type="submit"
                        className="button login-submit"
                    >
                        ĐĂNG KÝ
                    </button>

                </form>

                {/* ================================================= */}
                {/* SWITCH LOGIN */}
                {/* ================================================= */}

                <p className="auth-switch">

                    Đã có tài khoản?{" "}

                    <button
                        type="button"
                        onClick={onLogin}
                    >
                        Đăng nhập
                    </button>

                </p>

            </div>

        </div>
    );
}