import type {ReactNode} from "react";

import Router from "./Router.tsx"

export default function App() : ReactNode{
    return(
        <>
            <header>
                <a href={"/"}>_home</a>
                <a href={"/one"}>_one</a>
                <a href={"/two"}>_two</a>
                <a href={"/three"}>_three</a>
            </header>
            <Router/>
        </>
    )
}