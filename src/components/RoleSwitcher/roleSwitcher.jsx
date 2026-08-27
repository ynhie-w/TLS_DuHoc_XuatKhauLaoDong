import { useLocation, useNavigate } from "react-router-dom";
import "./roleSwitcher.css";

const roles = {
    student: {
        path: "/student/home",
        next: "company",
        label: "Dành cho học viên",
    },

    company: {
        path: "/company/home",
        next: "broker",
        label: "Dành cho công ty tuyển dụng",
    },

    broker: {
        path: "/broker/home",
        next: "student",
        label: "Dành cho nhà môi giới",
    },
};

export default function RoleSwitcher() {
    const navigate = useNavigate();
    const location = useLocation();

    let currentRole = "student";

    if (location.pathname.startsWith("/company/home")) {
        currentRole = "company";
    } else if (location.pathname.startsWith("/broker/home")) {
        currentRole = "broker";
    }

    const nextRole = roles[currentRole].next;

    const handleRoleChange = () => {
        navigate(roles[nextRole].path);
    };

    return (
        <div className="role">
            <button
                type="button"
                className="button"
                onClick={handleRoleChange}
            >
                {roles[currentRole].label}
            </button>
        </div>
    );
}