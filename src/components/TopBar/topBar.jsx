
import "./topBar.css";
import {
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaTiktok
} from "react-icons/fa6";
function TopBar() {
    return (
        <div className="top-bar">
        <div className="container top-bar__content">
            <div className="top-bar__contact">
                <a href="mailto:contact@tuonglaisang.com">
                    contact@àef.com
                </a>

                <a
                    href="https://maps.google.com/?q=Da+Nang"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Đà Nẵng
                </a>

                <a href="tel:0763576386">
                    0763 576 386
                </a>
            </div>
            <div className="top-bar__socials">
                <a><FaFacebook size={16}/></a>
                <a><FaInstagram size={16}/></a>
                <a><FaYoutube size={16}/></a>
                <a><FaTiktok size={16}/></a>
            </div>

        </div>
        </div>
    );
}

export default TopBar;