import "./App.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import EarthCanvas from "./components/EarthCanvas.jsx";
import { IoSearch } from "react-icons/io5";
import SearchBar from "./components/searchBar.jsx";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Display from "./components/display.jsx";
import Features from "./components/features.jsx";
import About from "./components/about.jsx";
import Background from "./components/background.jsx";
function App() {
  const [city, setcity] = useState("delhi");
  const [selectedTab, setselectedTab] = useState("Home");
  const handleSearch = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setcity(trimmed);
  };

  return (
    <div className="App">
      <Background />
      <Header selectedTab={selectedTab} setselectedTab={setselectedTab} />

      <div className="main-content">
        <div className="search-wrapper">
          <SearchBar onSearch={handleSearch} setselectedTab={setselectedTab} />
          <button
            className="search-btn"
            onClick={() => {
              const input = document.querySelector(".search-input");
              handleSearch(input.value);
            }}
          >
            <IoSearch className="search-icon" />
          </button>
        </div>

        <div className="content-row">
          <div className="sphere-wrapper">{<EarthCanvas />}</div>
          {selectedTab === "Home" && (
            <div className="display-area">
              <Display city={city} />
            </div>
          )}
          {selectedTab === "Features" && (
            <div className="info-card">
              <Features />
            </div>
          )}
          {selectedTab === "About" && (
            <div className="info-card">
              <About />
            </div>
          )}
        </div>
      </div>

      <Footer selectedTab={selectedTab} setselectedTab={setselectedTab} />
    </div>
  );
}

export default App;
