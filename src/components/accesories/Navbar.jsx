import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "../../css/accesories/Navbar.css";
import ModalLoaderPage from "./ModalLoaderPage";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut, loadingPage } = useContext(UserContext);
  const [form, setForm] = useState("");

  /** --------- HANDLE SEARCH --------   **/
  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.trim()) return;
    const search = form.trim().split(" ").join("_");
    setForm("");
    navigate(`/search/${search}`);
  };

  return (
    <>
      {loadingPage && <ModalLoaderPage />}
      <nav className="navbar navbar-expand-lg navbarContainer">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/assets/img/Sharknet2.png"
              alt="sharknet"
              className="sharknet-logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light"
                  aria-current="page"
                  to="products"
                >
                  Products
                </NavLink>
              </li>

              {/** ------------------ Dinamic content ------------------   **/}
              {user ? (
                <>
                  <li>
                    <NavLink
                      className="nav-link active text-light"
                      aria-current="page"
                      to="/"
                      onClick={logOut}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-light"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}

              {/** ----------------- End Dinamic content ---------------   **/}
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setForm(e.target.value)}
                value={form || ""}
              />
              <button className="btnNavbar" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
