import Banner from "../../../components/Banner/bannerStudent";
import ProgramCard from "../../../components/Card/programCard";

import "./home.css";

function Home() {
    return (
        <div className="home">

            <Banner />

            <h1>Trang chủ môi giới</h1>

            <ProgramCard />

        </div>
    );
}

export default Home;