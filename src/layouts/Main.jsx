import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { SearchFilterProvider } from "../hooks/SearchFilterContext";

const Main = () => {
  return (
    <SearchFilterProvider>
      <div>
        {/* Navbar */}
        <Navbar />
        {/* Outlet */}
        <div className="flex gap-0">
          {" "}
          <Sidebar />
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </SearchFilterProvider>
  );
};

export default Main;
