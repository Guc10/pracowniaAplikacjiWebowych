import type {ReactNode} from "react";
import {BrowserRouter, Route, Routes} from "react-router";

import Home from "./routes/home.tsx";
import Site_one from "./routes/site_one.tsx";
import Site_two from "./routes/site_two.tsx";
import Site_three from "./routes/site_three.tsx";

export default function Router() : ReactNode{
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/one" element={<Site_one />} />
                <Route path="/two" element={<Site_two />} />
                <Route path="/three" element={<Site_three />} />
            </Routes>
        </BrowserRouter>
    )
}