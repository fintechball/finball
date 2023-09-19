import { useState } from "react";

import "./App.css";

import Router from "../src/routes/index";

import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";

function App() {
  return (
    <>
      <div>
        <Header />
        <Router />
        <Footer />
      </div>
    </>
  );
}

export default App;
