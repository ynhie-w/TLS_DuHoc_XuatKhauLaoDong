import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentLayout from "../layouts/StudentLayout/studentLayout";
import CompanyLayout from "../layouts/CompanyLayout/companyLayout";
import BrokerLayout from "../layouts/BrokerLayout/brokerLayout";
//////////////////////////////////
import News from "../pages/SharedPage/News/news";
import Contact from "../pages/SharedPage/Contact/contact";
//////////////////////////////////

import HomeStudent from "../pages/StudentPage/Home/home";
import Country from "../pages/StudentPage/Country/country";
import Program from "../pages/StudentPage/Program/program";
import Ai from "../pages/StudentPage/AI/ai";
//////////////////////////////////

import HomeCompany from "../pages/CompanyPage/Home/home";
import Jobs from "../pages/CompanyPage/Jobs/jobs";
import Candidates from "../pages/CompanyPage/Candidates/candidates";
import Exams from "../pages/CompanyPage/Exams/exams";
//////////////////////////////////

import HomeBroker from "../pages/BrokerPage/Home/home";
import Programs from "../pages/BrokerPage/Program/programs";
import Students from "../pages/BrokerPage/Students/students";
import Post from "../pages/BrokerPage/Post/post";
function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<StudentLayout />}>

                    
                    <Route
                        path="/student/home"
                        element={<HomeStudent />}
                    />
                    <Route
                        path="/student/country"
                        element={<Country />}
                    />
                    <Route
                        path="/student/program"
                        element={<Program />}
                    />
                    <Route
                        path="/student/ai"
                        element={<Ai />}
                    />
                    <Route
                        path="/student/news"
                        element={<News />}
                    />
                    <Route
                        path="/student/contact"
                        element={<Contact />}
                    />
                </Route>
                <Route element={<CompanyLayout />}>

                    <Route
                        path="/company/home"
                        element={<HomeCompany />}
                    />
                    <Route
                        path="/company/jobs"
                        element={<Jobs />}
                    />
                    <Route
                        path="/company/candidates"
                        element={<Candidates />}
                    />
                    <Route
                        path="/company/exams"
                        element={<Exams />}
                    />
                    <Route
                        path="/company/news"
                        element={<News />}
                    />
                    <Route
                        path="/company/contact"
                        element={<Contact />}
                    />

                </Route>
                <Route element={<BrokerLayout />}>
                    <Route
                        path="/broker/home"
                        element={<HomeBroker />}
                    />
                    <Route
                        path="/broker/programs"
                        element={<Programs />}
                    />
                    <Route
                        path="/broker/students"
                        element={<Students />}
                    />
                    <Route
                        path="/broker/post"
                        element={<Post />}
                    />      
                    <Route
                        path="/broker/news"
                        element={<News />}
                    />
                    <Route
                        path="/broker/contact"
                        element={<Contact />}
                    />
                </Route>
            </Routes>

        </BrowserRouter>
    );
}

export default App;