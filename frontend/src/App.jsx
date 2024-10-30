import React from "react";
import Header from "./components/Header";
import MainDiv from "./components/MainDiv";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/app" : "/app";

const App = () => {
  return (
    <div className="mt-2">
      <Header />
      <MainDiv />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
