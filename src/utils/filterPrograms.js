// Bảng tỷ giá quy đổi sang VND (Tham khảo theo tỷ giá thực tế)
const EXCHANGE_RATES = {
    VND: 1,
    USD: 25400,
    JPY: 165,
    KRW: 18.5,
    EUR: 27500,
    TWD: 780,
};

/**
 * Quy đổi giá trị ngoại tệ về VNĐ
 * @param {number|string} amount - Giá trị tiền mặt
 * @param {string} currency - Mã tiền tệ (VND, JPY, USD, KRW...)
 * @returns {number} Số tiền đã quy đổi ra VNĐ
 */
const convertToVnd = (amount, currency = "VND") => {
    const numericAmount = Number(amount) || 0;
    const rate = EXCHANGE_RATES[currency?.toUpperCase()] || 1;
    return numericAmount * rate;
};

export function filterPrograms(programs, filters) {
    if (!Array.isArray(programs)) return [];

    return programs.filter((program) => {

        // =========================
        // QUỐC GIA
        // =========================
        if (
            filters.countryId &&
            Number(program.countryId) !== Number(filters.countryId)
        ) {
            return false;
        }

        // =========================
        // NGÀNH NGHỀ
        // =========================
        if (
            filters.fieldId &&
            Number(program.fieldId) !== Number(filters.fieldId)
        ) {
            return false;
        }

        // =========================
        // LOẠI CHƯƠNG TRÌNH
        // =========================
        if (filters.programTypeId) {
            const pTypeId = program.programTypeId ?? program.typeId ?? program.programType?.id;

            if (pTypeId === undefined || Number(pTypeId) !== Number(filters.programTypeId)) {
                return false;
            }
        }

        // =========================
        // TRÌNH ĐỘ
        // =========================
        if (filters.educationLevelId) {
            const eduId = program.educationLevelId ?? program.educationLevel?.id;

            if (eduId === undefined || Number(eduId) !== Number(filters.educationLevelId)) {
                return false;
            }
        }

        // =========================
        // MỨC LƯƠNG (Quy đổi tiền tệ sang VNĐ)
        // =========================
        if (filters.salary) {
            // Lấy mã tiền tệ bài đăng (Mặc định là VND)
            const currency = program.currency || program.salaryCurrency || "VND";

            // Nếu DB đã quy đổi sẵn ra VND trong salaryVndMin / salaryVndMax
            // thì dùng trực tiếp, ngược lại dùng salaryMin / salaryMax để đổi qua convertToVnd
            const rawMin = program.salaryVndMin ?? convertToVnd(program.salaryMin, currency);
            const rawMax = program.salaryVndMax ?? convertToVnd(program.salaryMax, currency);

            // Đổi ra đơn vị Triệu VNĐ
            const salaryMinInMillions = Number(rawMin) / 1_000_000;
            const salaryMaxInMillions = Number(rawMax) / 1_000_000;

            if (
                filters.salary === "under30" &&
                salaryMinInMillions >= 30
            ) {
                return false;
            }

            if (
                filters.salary === "30-50" &&
                (salaryMaxInMillions < 30 || salaryMinInMillions > 50)
            ) {
                return false;
            }

            if (
                filters.salary === "over50" &&
                salaryMaxInMillions <= 50
            ) {
                return false;
            }
        }

        // =========================
        // CHI PHÍ (Quy đổi tiền tệ sang VNĐ)
        // =========================
        if (filters.cost) {
            const currency = program.currency || program.costCurrency || "VND";
            const rawCost = program.costVnd ?? convertToVnd(program.cost, currency);
            const costInMillions = Number(rawCost) / 1_000_000;

            if (
                filters.cost === "under100" &&
                costInMillions >= 100
            ) {
                return false;
            }

            if (
                filters.cost === "100-150" &&
                (costInMillions < 100 || costInMillions > 150)
            ) {
                return false;
            }

            if (
                filters.cost === "over150" &&
                costInMillions <= 150
            ) {
                return false;
            }
        }

        // =========================
        // ĐỘ TUỔI
        // =========================
        if (filters.age) {
            const ageMin = Number(program.ageMin);
            const ageMax = Number(program.ageMax);

            if (
                filters.age === "18-25" &&
                (ageMax < 18 || ageMin > 25)
            ) {
                return false;
            }

            if (
                filters.age === "26-30" &&
                (ageMax < 26 || ageMin > 30)
            ) {
                return false;
            }

            if (
                filters.age === "31-35" &&
                (ageMax < 31 || ageMin > 35)
            ) {
                return false;
            }
        }

        return true;
    });
}