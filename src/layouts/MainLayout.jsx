import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

const MainLayout = () => {
  const { loading } = useAuth();
  const location = useLocation();
  const [manualLoading, setManualLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setManualLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideLayout = location.pathname === "*";

  if (loading || manualLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="flex flex-col min-h-screen bg-base-100 text-base-content ">
        {!hideLayout && <Navbar />}
        <main className="grow w-11/12 mx-auto">
          {loading ? <Loader /> : <Outlet />}
        </main>
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
