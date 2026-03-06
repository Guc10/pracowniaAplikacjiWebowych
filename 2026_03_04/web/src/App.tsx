import Header from './components/Header'
import Footer from './components/Footer'
import Home from "./scenes/Home";
import Post from "./scenes/Post";
import Posts from "./scenes/Posts";
import {Route, Routes} from "react-router";

export default function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
        <Footer/>
    </>
  )
}