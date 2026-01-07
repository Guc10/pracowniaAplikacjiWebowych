import Router from './Router'
import Header from './components/Header.tsx'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
        <Header/>
        <main>
            <Router/>
        </main>
        <Footer/>
    </>
  )
}