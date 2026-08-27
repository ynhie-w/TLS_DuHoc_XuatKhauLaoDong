import banner from "../../assets/images/Banner/banner.png";
import search from "../../assets/icons/find.png";
import "./banner.css";
export default function bannerStudent() {
    return (
        <> 
            <div className="banner-home">
                <div className="banner-image">
                    <img src={banner} alt="Banner" />
                </div>
                <div className="search">
                    <input placeHolder="Nhập tìm kiếm..."></input>
                    <button type="button" className="button button-icon" aria-label="Tìm kiếm">
                        <img src={search} alt="" />
                    </button>
                </div>
                <div className="banner-btn">
                    <button className="button" alt="">Khám phá chương trình</button>
                    <button className="button" alt="">AI tư vấn ngay</button>
                </div>
            </div>
        </>
    
    )
}
