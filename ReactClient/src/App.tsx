import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <div className={`relative h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <Header />
      <main className="flex-1 overflow-y-auto pt-12 pb-16">
        <Body />
      </main>
      <Footer />
    </div>
  );
}

export default App;
