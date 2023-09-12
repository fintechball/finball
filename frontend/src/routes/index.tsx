import { Route, Routes } from "react-router-dom";

import Pinball from "../pages/Pinball/Pinball";
import Counter from "../pages/Test/Counter";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Home";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/pinball" element={<Pinball />} /> */}
      </Routes>
    </>
  );
}

export default Router;
