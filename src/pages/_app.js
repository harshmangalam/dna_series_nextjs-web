import { Fragment } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../styles/globals.css";

import { AuthProvider } from "../context/auth";
import Axios from "axios";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";

Axios.defaults.baseURL = "https://dnaseries.herokuapp.com/api";
// Axios.defaults.baseURL = "http://localhost:4000/api";
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const authRoutes = ["/login", "/register"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <Fragment>
      <SWRConfig
        value={{
          fetcher: (url) => Axios.get(url).then((res) => res.data),
          dedupingInterval: 10000,
        }}
      >
        <AuthProvider>
          {!authRoute && <Navbar />}
          <div className="min-h-screen">
            <Component {...pageProps} />
          </div>
          {!authRoute && <Footer />}
        </AuthProvider>
      </SWRConfig>
    </Fragment>
  );
}

export default MyApp;
