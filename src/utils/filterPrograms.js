export function filterPrograms(programs, filters) {
    return programs.filter((program) => {

        // =========================
        // QUỐC GIA
        // =========================
        if (
            filters.countryId &&
            program.countryId !== Number(filters.countryId)
        ) {
            return false;
        }

        // =========================
        // NGÀNH NGHỀ
        // =========================
        if (
            filters.fieldId &&
            program.fieldId !== Number(filters.fieldId)
        ) {
            return false;
        }

        // =========================
        // TRÌNH ĐỘ
        // =========================
        if (
            filters.educationLevelId &&
            program.educationLevelId !== Number(
                filters.educationLevelId
            )
        ) {
            return false;
        }

        // =========================
        // MỨC LƯƠNG
        // =========================
        if (filters.salary) {

            const salaryMin =
                Number(program.salaryVndMin) / 1_000_000;

            const salaryMax =
                Number(program.salaryVndMax) / 1_000_000;

            if (
                filters.salary === "under30" &&
                salaryMin >= 30
            ) {
                return false;
            }

            if (
                filters.salary === "30-50" &&
                (
                    salaryMax < 30 ||
                    salaryMin > 50
                )
            ) {
                return false;
            }

            if (
                filters.salary === "over50" &&
                salaryMax <= 50
            ) {
                return false;
            }
        }

        // =========================
        // CHI PHÍ
        // =========================
        if (filters.cost) {

            const cost =
                Number(program.cost) / 1_000_000;

            if (
                filters.cost === "under100" &&
                cost >= 100
            ) {
                return false;
            }

            if (
                filters.cost === "100-150" &&
                (
                    cost < 100 ||
                    cost > 150
                )
            ) {
                return false;
            }

            if (
                filters.cost === "over150" &&
                cost <= 150
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
                (
                    ageMax < 18 ||
                    ageMin > 25
                )
            ) {
                return false;
            }

            if (
                filters.age === "26-30" &&
                (
                    ageMax < 26 ||
                    ageMin > 30
                )
            ) {
                return false;
            }

            if (
                filters.age === "31-35" &&
                (
                    ageMax < 31 ||
                    ageMin > 35
                )
            ) {
                return false;
            }
        }

        return true;
    });
}