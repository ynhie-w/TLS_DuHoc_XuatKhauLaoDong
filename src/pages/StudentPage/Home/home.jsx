import { useEffect, useState } from "react";

import Banner from "../../../components/Banner/bannerStudent";
import CountryList from "../../../components/List/countryList";
import Filter from "../../../components/Filter/filter";
import ProgramCard from "../../../components/Card/programCard";
import NewsCard from "../../../components/Card/newsCard";
import Pagination from "../../../components/Pagination/pagination";

import { filterPrograms } from "../../../utils/filterPrograms";

import "./home.css";

function Home() {
    // =====================================================
    // PROGRAMS
    // =====================================================

    const [programs, setPrograms] = useState([]);
    const [loadingPrograms, setLoadingPrograms] = useState(true);
    const [programError, setProgramError] = useState("");

    // =====================================================
    // COUNTRIES
    // =====================================================

    const [countries, setCountries] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    // =====================================================
    // NEWS
    // =====================================================

    const [news, setNews] = useState([]);

    // =====================================================
    // FILTER
    // =====================================================

    const [filters, setFilters] = useState({
        countryId: "",
        fieldId: "",
        programTypeId: "",
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
    // GET PROGRAMS
    // =====================================================

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                setLoadingPrograms(true);
                setProgramError("");

                const response = await fetch(
                    "http://localhost:5000/api/programs"
                );

                if (!response.ok) {
                    throw new Error("Không thể lấy danh sách chương trình");
                }

                const result = await response.json();

                setPrograms(
                    Array.isArray(result) ? result : result.data || []
                );
            } catch (error) {
                console.error("GET PROGRAMS ERROR:", error);
                setProgramError("Không thể tải danh sách chương trình.");
            } finally {
                setLoadingPrograms(false);
            }
        };

        fetchPrograms();
    }, []);

    // =====================================================
    // GET COUNTRIES
    // =====================================================

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoadingCountries(true);

                const response = await fetch(
                    "http://localhost:5000/api/master-data/countries"
                );

                if (!response.ok) {
                    throw new Error("Không thể lấy danh sách quốc gia");
                }

                const result = await response.json();

                setCountries(
                    Array.isArray(result) ? result : result.data || []
                );
            } catch (error) {
                console.error("GET COUNTRIES ERROR:", error);
                setCountries([]);
            } finally {
                setLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    // =====================================================
    // GET NEWS
    // =====================================================

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/content/news"
                );

                if (!response.ok) {
                    throw new Error("Không thể lấy tin tức");
                }

                const result = await response.json();

                setNews(
                    Array.isArray(result) ? result : result.data || []
                );
            } catch (error) {
                console.error("GET NEWS ERROR:", error);
                setNews([]);
            }
        };

        fetchNews();
    }, []);

    // =====================================================
    // FILTER PROGRAMS
    // =====================================================

    const filteredPrograms = filterPrograms(programs, filters);

    // =====================================================
    // COUNTRY DATA (Gắn thêm số lượng chương trình khả dụng)
    // =====================================================

    const countryData = countries.map((country) => {
        const programCount = programs.filter(
            (program) =>
                Number(program.countryId) === Number(country.id) &&
                program.status === "active" &&
                (!program.applicationDeadline ||
                    new Date(program.applicationDeadline) >= new Date())
        ).length;

        return {
            ...country,
            programCount,
        };
    });

    // =====================================================
    // PAGINATION LOGIC
    // =====================================================

    const totalProgramPages = Math.ceil(
        filteredPrograms.length / cardsPerPage
    );

    const programStartIndex = (programPage - 1) * cardsPerPage;

    const currentPrograms = filteredPrograms.slice(
        programStartIndex,
        programStartIndex + cardsPerPage
    );

    // =====================================================
    // HANDLERS
    // =====================================================

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setProgramPage(1);
    };

    const handleCountryChange = (countryId) => {
        setFilters((prev) => ({
            ...prev,
            countryId:
                Number(prev.countryId) === Number(countryId)
                    ? ""
                    : countryId,
        }));

        setProgramPage(1);
    };

    // =====================================================
    // LATEST NEWS
    // =====================================================

    const latestNews = [...news]
        .filter((item) => item.status === "published")
        .sort(
            (a, b) =>
                new Date(b.publishedAt) - new Date(a.publishedAt)
        )
        .slice(0, 4);

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="home">
            {/* BANNER */}
            <Banner />

            {/* PROGRAMS SECTION */}
            <section className="home-programs">
                <h1>Việc làm xuất khẩu lao động mới nhất</h1>

                <div className="options">
                    {/* LEFT: COUNTRY LIST */}
                    <div className="country-list">
                        <CountryList
                            data={countryData}
                            selectedCountry={filters.countryId}
                            onCountryChange={handleCountryChange}
                            loading={loadingCountries}
                        />
                    </div>

                    {/* RIGHT: FILTER & PROGRAM CARDS */}
                    <div className="filter-card">
                        <Filter
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            countries={countries}
                        />

                        <div className="cardx">
                            {/* ERROR */}
                            {!loadingPrograms && programError && (
                                <p className="error">{programError}</p>
                            )}

                            {/* PROGRAM CARD */}
                            {!programError && (
                                <ProgramCard
                                    data={currentPrograms}
                                    loading={loadingPrograms}
                                />
                            )}

                            {/* PAGINATION */}
                            {!loadingPrograms &&
                                !programError &&
                                totalProgramPages > 1 && (
                                    <Pagination
                                        currentPage={programPage}
                                        totalPages={totalProgramPages}
                                        onPageChange={setProgramPage}
                                    />
                                )}
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWS SECTION */}
            <section className="home-news">
                <h1>Tin tức mới nhất</h1>
                <NewsCard data={latestNews} />
            </section>
        </div>
    );
}

export default Home;