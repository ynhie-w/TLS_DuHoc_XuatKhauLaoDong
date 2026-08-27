# 🌱 Tương Lai Sáng - Du học - Xuất khẩu lao động
Your journey. Your opportunity. Your future.
Tương Lai Sáng là nền tảng **hỗ trợ học viên và những người có nhu cầu du học, học nghề và làm việc ở nước ngoài** tìm kiếm thông tin, khám phá chương trình phù hợp và định hướng hành trình tương lai một cách dễ dàng hơn.

Website được xây dựng với mong muốn tạo ra một không gian **đơn giản – trực quan – đáng tin cậy**, nơi người dùng có thể chủ động tìm hiểu về các quốc gia, chương trình học, cơ hội việc làm và nhận được sự hỗ trợ trong quá trình lựa chọn.

---

## 🎯 Dành cho ai?

### 👩‍🎓 Học viên

Tương Lai Sáng được thiết kế dành cho những người đang:

- 🌏 Tìm hiểu cơ hội **du học**
- 🎓 Tìm kiếm **chương trình học và đào tạo**
- 💼 Quan tâm đến **cơ hội việc làm ở nước ngoài**
- 🗺️ Muốn khám phá các **quốc gia và thị trường phù hợp**
- 🤖 Cần hỗ trợ để lựa chọn chương trình phù hợp với bản thân

Thay vì phải tìm kiếm thông tin từ nhiều nguồn khác nhau, người dùng có thể khám phá và tiếp cận các thông tin cần thiết trên một nền tảng.

---

## ✨ Tương Lai Sáng có gì?

### 🌎 Khám phá quốc gia

Tìm hiểu thông tin về các quốc gia có chương trình du học, đào tạo và việc làm.

Người dùng có thể khám phá:

- Quốc gia
- Điều kiện
- Chi phí
- Mức lương
- Độ tuổi
- Thời hạn tuyển sinh
- Các chương trình đang tuyển

---

### 🎓 Khám phá chương trình

Tìm kiếm và xem các chương trình phù hợp với nhu cầu cá nhân.

Thông tin chương trình bao gồm:

- Tên chương trình
- Quốc gia
- Ngành nghề
- Chi phí
- Điều kiện tham gia
- Thời gian
- Hạn đăng ký

---

### 🔎 Tìm kiếm thông minh

Không cần mất thời gian tìm kiếm thủ công.

Người dùng có thể tìm kiếm theo:

> **Quốc gia → Chương trình → Ngành nghề → Cơ hội phù hợp**

giúp nhanh chóng tiếp cận những thông tin mình quan tâm.

---

### 🤖 AI Tư vấn

Tương Lai Sáng hướng đến việc tích hợp **AI Assistant** nhằm hỗ trợ người dùng trong quá trình tìm hiểu và lựa chọn.

AI có thể hỗ trợ:

- Gợi ý quốc gia phù hợp
- Gợi ý chương trình
- Định hướng ngành nghề
- So sánh các lựa chọn
- Giải đáp những câu hỏi thường gặp

> **Bạn không cần biết chính xác mình nên bắt đầu từ đâu. Hãy để Tương Lai Sáng giúp bạn tìm ra hướng đi.**

---

## 🚀 Mục tiêu của dự án

Tương Lai Sáng không chỉ đơn giản là một website cung cấp thông tin.

Mục tiêu của dự án là xây dựng một nền tảng giúp người dùng:

**Khám phá → Tìm hiểu → So sánh → Được tư vấn → Lựa chọn → Bắt đầu hành trình**

Qua đó, quá trình tìm kiếm cơ hội học tập và làm việc ở nước ngoài trở nên **dễ tiếp cận, minh bạch và cá nhân hóa hơn**.

---

## 🛠️ Công nghệ sử dụng

Frontend được xây dựng với:

- **React.js**
- **Vite**
- **JavaScript / JSX**
- **CSS**
- **React Router**
- **Lucide React / React Icons**

Dự án được xây dựng theo hướng **Component-Based Architecture**, giúp các thành phần như Header, TopBar, Banner, Card và Button có thể được tái sử dụng trên nhiều trang.

---

## 📂 Cấu trúc dự án

```text
src/
├── api/
│   ├── axios.js
│

├── assets/
│   ├── icons/
│   └── images/
│
├── components/
│   ├── TopBar/
│   ├── Header/
│   ├── Banner/
│   ├── Card/
│   └── ...
│
├── layouts/
│   ├── GuestLayout/
│   ├── StudentLayout/
│   ├── BrokerLayout/
│   ├── CompanyLayout/
│   └── AdminLayout/
│
├── pages/
│   ├── AdminPage/
│   ├── BrokerPage/
│   ├── CompanyPage/
│   ├── PublicPage/
│   ├── StudentPage/
│
├── styles/
│   ├── animation.css
│   ├── button.css
│   ├── global.css
│   ├── utilities.css
│   └── variables.css
│
└── App.jsx