import { Outlet } from "react-router-dom";
import "../styles/layout.css";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const Layout = () => {
  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
