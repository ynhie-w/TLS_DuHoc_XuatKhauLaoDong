import { useState } from "react";

import Banner from "../../../components/Banner/bannerStudent";
import CountryList from "../../../components/List/countryList";
import Filter from "../../../components/Filter/filter";
import ProgramCard from "../../../components/Card/programCard";
import NewsCard from "../../../components/Card/newsCard";
import Pagination from "../../../components/Pagination/pagination";

import { filterPrograms } from "../../../utils/filterPrograms";

import {
    programs,
    news,
    countries,
} from "../../../mockData/data";

import "./home.css";

function Home() {

    // =====================================================
    // FILTER
    // =====================================================

    const [filters, setFilters] = useState({
        countryId: "",
        fieldId: "",
        salary: "",
        cost: "",
        age: "",
        educationLevelId: "",
    });


    // =====================================================
    // PAGINATION
    // =====================================================

    const [programPage, setProgramPage] = useState(1);

    const cardsPerPage = 8;


    // =====================================================
    // FILTER PROGRAMS
    // =====================================================

    const filteredPrograms = filterPrograms(
        programs,
        filters
    );


    // =====================================================
    // COUNTRY DATA
    // =====================================================

    const countryData = countries.map((country) => {

        const programCount = programs.filter(
            (program) =>
                program.countryId === country.id &&
                program.status === "active" &&
                new Date(program.applicationDeadline) >=
                    new Date()
        ).length;

        return {
            ...country,
            programCount,
        };
    });


    // =====================================================
    // PAGINATION
    // =====================================================

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


    // =====================================================
    // FILTER CHANGE
    // =====================================================

    const handleFilterChange = (newFilters) => {

        setFilters(newFilters);

        setProgramPage(1);
    };


    // =====================================================
    // COUNTRY CHANGE
    // =====================================================

    const handleCountryChange = (countryId) => {

        setFilters((prev) => ({
            ...prev,

            countryId:
                Number(prev.countryId) === countryId
                    ? ""
                    : countryId,
        }));

        setProgramPage(1);
    };


    // =====================================================
    // LATEST NEWS
    // =====================================================

    const latestNews = [...news]
        .filter(
            (item) =>
                item.status === "published"
        )
        .sort(
            (a, b) =>
                new Date(b.publishedAt) -
                new Date(a.publishedAt)
        )
        .slice(0, 4);


    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="home">

            {/* =================================================
                                BANNER
            ================================================= */}

            <Banner />


            {/* =================================================
                            PROGRAMS
            ================================================= */}

            <section className="home-programs">

                <h1>
                    Việc làm xuất khẩu lao động mới nhất
                </h1>


                <div className="options">

                    {/* =========================================
                                COUNTRY
                    ========================================= */}

                    <div className="country-list">

                        <CountryList
                            data={countryData}
                            selectedCountry={
                                filters.countryId
                                    ? Number(filters.countryId)
                                    : null
                            }
                            onCountryChange={
                                handleCountryChange
                            }
                        />

                    </div>


                    {/* =========================================
                                RIGHT
                    ========================================= */}

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

            </section>


            {/* =================================================
                            NEWS
            ================================================= */}

            <section className="home-news">

                <h1>
                    Tin tức mới nhất
                </h1>

                <NewsCard
                    data={latestNews}
                />

            </section>

        </div>
    );
}

export default Home;