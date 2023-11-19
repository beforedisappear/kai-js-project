import "../styles/App.scss";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function RootLayout() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <main>
          <div className="content">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
