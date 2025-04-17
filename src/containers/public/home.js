import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Navigation from "./navigation";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-between h-full border-red-500">
      <Header />
      <Navigation />
      <div className="w-1100 flex flex-col items-center justify-start mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
