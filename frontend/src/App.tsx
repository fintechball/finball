import "./App.css";

import Router from "../src/routes/index";
import { useLocation } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/game" || location.pathname === "/game2";
  return (
    <>
      <div>
        {!hideHeaderFooter && <Header />}
        <Router />
        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
