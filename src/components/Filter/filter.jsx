import { useEffect, useState } from "react";
import "./filter.css";

function Filter({ filters, onFilterChange, countries = [] }) {
    const [fields, setFields] = useState([]);
    const [educationLevels, setEducationLevels] = useState([]);
    const [programTypes, setProgramTypes] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    // =====================================================
    // GET FILTER MASTER DATA (FIELDS, EDUs, TYPES)
    // =====================================================

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                setLoadingData(true);

                const [
                    fieldsRes,
                    educationRes,
                    programTypesRes,
                ] = await Promise.all([
                    fetch("http://localhost:5000/api/master-data/fields"),
                    fetch("http://localhost:5000/api/master-data/educationLevels"),
                    fetch("http://localhost:5000/api/programs/programTypes"),
                ]);

                const fieldsData = await fieldsRes.json();
                const educationData = await educationRes.json();
                const programTypesData = await programTypesRes.json();

                setFields(
                    Array.isArray(fieldsData)
                        ? fieldsData
                        : fieldsData.data || []
                );

                setEducationLevels(
                    Array.isArray(educationData)
                        ? educationData
                        : educationData.data || []
                );

                setProgramTypes(
                    Array.isArray(programTypesData)
                        ? programTypesData
                        : programTypesData.data || []
                );
            } catch (error) {
                console.error("GET FILTER DATA ERROR:", error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchFilterData();
    }, []);

    // =====================================================
    // STATIC OPTIONS
    // =====================================================

    const salaryOptions = [
        { value: "under30", label: "Dưới 30 triệu" },
        { value: "30-50", label: "30 - 50 triệu" },
        { value: "over50", label: "Trên 50 triệu" },
    ];

    const costOptions = [
        { value: "under100", label: "Dưới 100 triệu" },
        { value: "100-150", label: "100 - 150 triệu" },
        { value: "over150", label: "Trên 150 triệu" },
    ];

    const ageOptions = [
        { value: "18-25", label: "18 - 25 tuổi" },
        { value: "26-30", label: "26 - 30 tuổi" },
        { value: "31-35", label: "31 - 35 tuổi" },
    ];

    // =====================================================
    // HANDLER
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        onFilterChange({
            ...filters,
            [name]: value,
        });
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="filter">
            <div className="filter-content">
                {/* ================= COUNTRY ================= */}
                <select
                    name="countryId"
                    value={filters.countryId || ""}
                    onChange={handleChange}
                >
                    <option value="">Quốc gia</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>

                {/* ================= FIELD ================= */}
                <select
                    name="fieldId"
                    value={filters.fieldId || ""}
                    onChange={handleChange}
                    disabled={loadingData}
                >
                    <option value="">Ngành nghề</option>
                    {fields.map((field) => (
                        <option key={field.id} value={field.id}>
                            {field.name}
                        </option>
                    ))}
                </select>

                {/* ================= PROGRAM TYPE ================= */}
                <select
                    name="programTypeId"
                    value={filters.programTypeId || ""}
                    onChange={handleChange}
                    disabled={loadingData}
                >
                    <option value="">Loại chương trình</option>
                    {programTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>

                {/* ================= SALARY ================= */}
                <select
                    name="salary"
                    value={filters.salary || ""}
                    onChange={handleChange}
                >
                    <option value="">Mức lương</option>
                    {salaryOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* ================= COST ================= */}
                <select
                    name="cost"
                    value={filters.cost || ""}
                    onChange={handleChange}
                >
                    <option value="">Chi phí</option>
                    {costOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* ================= AGE ================= */}
                <select
                    name="age"
                    value={filters.age || ""}
                    onChange={handleChange}
                >
                    <option value="">Độ tuổi</option>
                    {ageOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* ================= EDUCATION ================= */}
                <select
                    name="educationLevelId"
                    value={filters.educationLevelId || ""}
                    onChange={handleChange}
                    disabled={loadingData}
                >
                    <option value="">Trình độ</option>
                    {educationLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Filter;