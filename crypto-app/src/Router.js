import {Routes, Route, Navigate} from "react-router-dom";

import Dashboard from "./views/dashboard/dashboard";
import Layout from "./components/layout/layout";
import Home from "./views/Home/Home";
import Tracking from "./views/Tracking/Tracking";
import Plans from "./views/plans/Plans";
import About from "./views/About/About";
import Tools from "./views/Outils/Tools";
import HomeV2 from "./views/HomeV2/HomeV2";
import MetaMask from "./views/MetaMask/MetaMask";
import SocialPage from "./views/Publication/SocialPage";
import Spotlight from "./views/Spotlight/Spotlight";

export function Router() {
    return (
        <Routes>
            <Route path="/home" element={<HomeV2/>}></Route>
            <Route path="plans" element={<Plans/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}

export function PrivateRouter() {
    return (
        <Routes>
            <Route path="/home" element={<HomeV2/>}></Route>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="tracking" element={<Tracking/>}/>
            <Route path="tools" element={<Tools/>}/>
            <Route path="plans" element={<Plans/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="metamask" element={<MetaMask/>}/>
            <Route path="social" element={<SocialPage/>}/>
            <Route path="spotlight" element={<Spotlight/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    );
}
