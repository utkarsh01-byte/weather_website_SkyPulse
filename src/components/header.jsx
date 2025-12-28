const Header = ({ selectedTab, setselectedTab }) => {
  return (
    <div className="container-fluid header">
      <header className="d-flex justify-content-between align-items-center py-3">
        <div className="head">
          <div className="sky"></div>
          <h1 className="name m-0">SkyPulse</h1>
        </div>
        <ul className="items nav it">
          <li
            className="nav-item"
            onClick={() => {
              setselectedTab("Home");
            }}
          >
            <a
              href="#"
              className={`nav-link ${selectedTab === "Home" ? "active" : ""}`}
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li
            className="nav-item 
          "
            onClick={() => {
              setselectedTab("Features");
            }}
          >
            <a
              href="#"
              className={`nav-link ${
                selectedTab === "Features" ? "active" : ""
              }`}
              aria-current="page"
            >
              Features
            </a>
          </li>

          <li
            className="nav-item"
            onClick={() => {
              setselectedTab("About");
            }}
          >
            <a
              href="#"
              className={`nav-link ${selectedTab === "About" ? "active" : ""}`}
              aria-current="page"
            >
              About
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
