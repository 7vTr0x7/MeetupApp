import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="bg-body-tertiary">
      <Header />
      <Home />
    </div>
  );
};

export default App;
