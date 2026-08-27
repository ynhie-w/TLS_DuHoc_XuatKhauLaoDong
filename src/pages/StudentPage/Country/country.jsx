import { useState } from "react";

import CountryList from "../../../components/List/countryList";
import Filter from "../../../components/Filter/filter";
import ProgramCard from "../../../components/Card/programCard";
import Pagination from "../../../components/Pagination/pagination";

import {
    programs,
    countries,
    banners,
} from "../../../mockData/data";

import { filterPrograms } from "../../../utils/filterPrograms";

import "./country.css";

export default function Country() {

    /* ====================================================
                        FILTER
    ==================================================== */

    const [filters, setFilters] = useState({
        countryId: "",
        fieldId: "",
        salary: "",
        cost: "",
        age: "",
        educationLevelId: "",
    });


    /* ====================================================
                    SELECTED COUNTRY
    ==================================================== */

    // Mặc định Nhật Bản
    const [defaultCountryId] = useState(() => {

        const japan = countries.find(
            (country) => country.id === 1
        );

        if (japan) {
            return japan.id;
        }

        return countries[0]?.id || null;
    });


    const selectedCountryId =
        filters.countryId
            ? Number(filters.countryId)
            : defaultCountryId;


    /* ====================================================
                    SELECTED BANNER
    ==================================================== */

    // Banner độc lập với quốc gia
    const [selectedBanner] = useState(() => {

        const activeBanners = banners.filter(
            (banner) => banner.status === "active"
        );

        if (activeBanners.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(
            Math.random() * activeBanners.length
        );

        return activeBanners[randomIndex];
    });


    /* ====================================================
                        PAGINATION
    ==================================================== */

    const [programPage, setProgramPage] = useState(1);

    const cardsPerPage = 20;


    /* ====================================================
                    FILTER PROGRAM
    ==================================================== */

    const filteredPrograms = filterPrograms(
        programs,
        {
            ...filters,
            countryId: selectedCountryId,
        }
    );


    /* ====================================================
                    COUNTRY LIST
    ==================================================== */

    const countryData = countries.map((country) => {

        const programCount = programs.filter(
            (program) =>
                program.countryId === country.id &&
                new Date(program.applicationDeadline) >=
                    new Date()
        ).length;

        return {
            ...country,
            programCount,
        };
    });


    /* ====================================================
                    PAGINATION
    ==================================================== */

    const totalProgramPages = Math.ceil(
        filteredPrograms.length / cardsPerPage
    );

    const programStartIndex =
        (programPage - 1) * cardsPerPage;

    const currentPrograms =
        filteredPrograms.slice(
            programStartIndex,
            programStartIndex + cardsPerPage
        );


    /* ====================================================
                    FILTER CHANGE
    ==================================================== */

    const handleFilterChange = (newFilters) => {

        setFilters({
            ...newFilters,
            countryId:
                newFilters.countryId || "",
        });

        setProgramPage(1);
    };


    /* ====================================================
                    COUNTRY CHANGE
    ==================================================== */

    const handleCountryChange = (countryId) => {

        const newCountry =
            countryId === Number(filters.countryId)
                ? ""
                : countryId;

        setFilters({
            ...filters,
            countryId: newCountry,
        });

        setProgramPage(1);
    };


    /* ====================================================
                    FEATURED COUNTRIES
    ==================================================== */

    const featuredCountries = countries
        .map((country) => {

            const programCount = programs.filter(
                (program) =>
                    program.countryId === country.id &&
                    new Date(program.applicationDeadline) >=
                        new Date()
            ).length;

            return {
                ...country,
                programCount,
            };
        })
        .sort(
            (a, b) =>
                b.programCount - a.programCount
        )
        .slice(0, 5);


    /* ====================================================
                        RENDER
    ==================================================== */

    return (
        <div className="country-page">


            {/* ====================================================
                                BANNER
            ==================================================== */}

            {selectedBanner && (
                <div
                    className="banner-country"
                    style={{
                        backgroundImage: `url("${selectedBanner.image}")`,
                    }}
                >
                    <h1>
                        {selectedBanner.title}
                    </h1>

                    <h2>
                        {selectedBanner.description}
                    </h2>
                </div>
            )}


            {/* ====================================================
                        CÁC QUỐC GIA NỔI BẬT
            ==================================================== */}

            <div className="country-introduced">

                <h1>
                    Các quốc gia nổi bật
                </h1>

                <div className="list-country">

                    {featuredCountries.map((country) => (

                        <button
                            key={country.id}
                            type="button"
                            className={
                                selectedCountryId === country.id
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                handleCountryChange(
                                    country.id
                                )
                            }
                        >
                            {country.name}

                            <span>
                                {" "}
                                ({country.programCount})
                            </span>

                        </button>

                    ))}

                </div>

            </div>


            {/* ====================================================
                                CONTENT
            ==================================================== */}

            <div className="country">

                <div className="options">


                    {/* ====================================================
                                        COUNTRY
                    ==================================================== */}

                    <div className="country-list">

                        <CountryList
                            data={countryData}

                            selectedCountry={
                                selectedCountryId
                            }

                            onCountryChange={
                                handleCountryChange
                            }
                        />

                    </div>


                    {/* ====================================================
                                        RIGHT
                    ==================================================== */}

                    <div className="filter-card">

                        <Filter
                            filters={filters}
                            onFilterChange={
                                handleFilterChange
                            }
                        />


                        <div className="cardx">

                            <ProgramCard
                                data={currentPrograms}
                            />


                            {/* PAGINATION */}

                            {totalProgramPages > 1 && (

                                <Pagination
                                    currentPage={
                                        programPage
                                    }

                                    totalPages={
                                        totalProgramPages
                                    }

                                    onPageChange={
                                        setProgramPage
                                    }
                                />

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}