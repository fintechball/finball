import { useState } from "react";

import "./App.css";

import Router from "../src/routes/index";

import Header from "../src/components/Header/Header";

function App() {
  return (
    <>
      <div>
        <Header />
        <Router />
      </div>
    </>
  );
}

export default App;
