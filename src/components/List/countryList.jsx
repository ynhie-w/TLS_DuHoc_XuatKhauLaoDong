import ReactCountryFlag from "react-country-flag";

import "./countryList.css";

function CountryList({
    data = [],
    onCountryChange = () => {},
    selectedCountry = "",
    className = "",
}) {
    return (
        <div className={`country--list ${className}`}>

            {/* ================= TITLE ================= */}

            <h3>QUỐC GIA</h3>


            {/* ================= COUNTRY LIST ================= */}

            <div className="list">

                {data.map((country) => (

                    <button
                        key={country.id}
                        type="button"
                        className={`list-p ${
                            selectedCountry === country.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            onCountryChange(country.id)
                        }
                    >

                        <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            className="flag"
                        />

                        <span className="country-name">
                            {country.name}
                        </span>

                    </button>

                ))}

            </div>

        </div>
    );
}

export default CountryList;