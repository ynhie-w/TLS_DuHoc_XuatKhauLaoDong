import ReactCountryFlag from "react-country-flag";
import "./countryList.css";

// Component Skeleton hiển thị trạng thái loading dạng Shimmer
export function CountryListSkeleton({ count = 6 }) {
    return (
        <div className="list">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="skeleton-country-item">
                    <div className="skeleton skeleton-flag" />
                    <div className="skeleton skeleton-country-name" />
                </div>
            ))}
        </div>
    );
}

function CountryList({
    data = [],
    onCountryChange = () => {},
    selectedCountry = "",
    className = "",
    loading = false,
}) {
    return (
        <div className={`country--list ${className}`}>
            <h3>QUỐC GIA</h3>

            {loading ? (
                <CountryListSkeleton count={6} />
            ) : (
                <div className="list">
                    {data.map((country) => {
                        const countryId = Number(country.id);

                        return (
                            <button
                                key={countryId}
                                type="button"
                                className={`list-p ${
                                    Number(selectedCountry) === countryId ? "active" : ""
                                }`}
                                onClick={() => onCountryChange(countryId)}
                            >
                                <ReactCountryFlag
                                    countryCode={country.code}
                                    svg
                                    className="flag"
                                />

                                <span className="country-name">{country.name}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CountryList;