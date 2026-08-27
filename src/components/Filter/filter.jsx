import "./filter.css";

import {
    countries,
    fields,
    educationLevels,
    programTypes,
} from "../../mockData/data";

function Filter({ filters, onFilterChange }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        onFilterChange({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div className="filter">
            <div className="filter-content">

                {/* QUỐC GIA */}
                <select
                    name="countryId"
                    value={filters.countryId}
                    onChange={handleChange}
                >
                    <option value="">Quốc gia</option>

                    {countries.map((country) => (
                        <option
                            key={country.id}
                            value={country.id}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>

                {/* NGÀNH NGHỀ */}
                <select
                    name="fieldId"
                    value={filters.fieldId}
                    onChange={handleChange}
                >
                    <option value="">Ngành nghề</option>

                    {fields.map((field) => (
                        <option
                            key={field.id}
                            value={field.id}
                        >
                            {field.name}
                        </option>
                    ))}
                </select>

                {/* LOẠI CHƯƠNG TRÌNH */}
                <select
                    name="programTypeId"
                    value={filters.programTypeId}
                    onChange={handleChange}
                >
                    <option value="">Loại chương trình</option>

                    {programTypes.map((type) => (
                        <option
                            key={type.id}
                            value={type.id}
                        >
                            {type.name}
                        </option>
                    ))}
                </select>

                {/* MỨC LƯƠNG */}
                <select
                    name="salary"
                    value={filters.salary}
                    onChange={handleChange}
                >
                    <option value="">Mức lương</option>

                    {salaryOptions.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* CHI PHÍ */}
                <select
                    name="cost"
                    value={filters.cost}
                    onChange={handleChange}
                >
                    <option value="">Chi phí</option>

                    {costOptions.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* ĐỘ TUỔI */}
                <select
                    name="age"
                    value={filters.age}
                    onChange={handleChange}
                >
                    <option value="">Độ tuổi</option>

                    {ageOptions.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>

                {/* TRÌNH ĐỘ */}
                <select
                    name="educationLevelId"
                    value={filters.educationLevelId}
                    onChange={handleChange}
                >
                    <option value="">Trình độ</option>

                    {educationLevels.map((level) => (
                        <option
                            key={level.id}
                            value={level.id}
                        >
                            {level.name}
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
}

export default Filter;