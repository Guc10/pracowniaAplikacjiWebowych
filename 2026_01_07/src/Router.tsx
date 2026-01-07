import {BrowserRouter, Route, Routes} from "react-router";

import Home from "./components/Home";
import Wpis from "./components/Wpis";
import Kat from "./components/Kat";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/entry" element={<Kat />} />
                <Route path="/categories" element={<Wpis />} />
            </Routes>
        </BrowserRouter>
    )
}