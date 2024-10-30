import React from "react";
import Header from "./components/Header";
import MainDiv from "./components/MainDiv";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

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
