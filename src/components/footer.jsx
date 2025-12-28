const Footer = ({ selectedTab, setselectedTab }) => {
  return (
    <div className="container-fluid footer">
      <footer className="">
        <ul className="nav justify-content-center pb-3 mb-3">
          <li
            className="nav-item"
            onClick={() => {
              setselectedTab("Home");
            }}
          >
            <a href="#" className={`nav-link px-2 text-white ${selectedTab === "Home" ? "active" : ""}`}>
              Home
            </a>
          </li>
          <li className="nav-item"
            onClick={() => {
              setselectedTab("Features");
            }}>
            <a href="#" className={`nav-link px-2 text-white ${selectedTab === "Features" ? "active" : ""}`}>
              Features
            </a>
          </li>

          <li className="nav-item"
            onClick={() => {
              setselectedTab("About");
            }}>
            <a href="#" className={`nav-link px-2 text-white ${selectedTab === "About" ? "active" : ""}`}>
              About
            </a>
          </li>
        </ul>
        <p className="text-center text-white copy">© copyright by Utkarsh Vikram Singh</p>
      </footer>
    </div>
  );
};

export default Footer;
