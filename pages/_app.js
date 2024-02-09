import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './navbar'
import Footer from './footer'
export default function App({ Component, pageProps }) {
  return <>
  

  <Navbar/>
  <Component {...pageProps}  className="h-[400px]"/>
  <Footer/>
  
  </>
}
