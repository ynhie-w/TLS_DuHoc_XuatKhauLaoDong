import TopBar from "../../../components/TopBar/topBar";
import Header from "../../../components/Header/header";
import Banner from "../../../components/Banner/bannerStudent";
import ProgramCard from "../../../components/Card/programCard";
import Footer from "../../../components/Footer/footer";
import "./home.css";
function Home() {
  return (
    <>
      home của admin
      <TopBar />
      <Header />
      <main className="home">
        <Banner />
        <h1>Trang chủ</h1>
        <ProgramCard />
      </main> <Footer/>
    </>
  );
}

export default Home;
