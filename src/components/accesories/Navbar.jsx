import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "../../css/accesories/Navbar.css";
import ModalLoaderPage from "./ModalLoaderPage";
import userIcon from "../../svg/user_icon.svg";
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
              {!user && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-light"
                      aria-current="page"
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>
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

            {/**  -----------  Dinamic content -----------  **/}
            <ul className="navbar-nav ms-5 me-5 mb-2 mb-lg-0">
              {user && (
                <>
                  <li className="nav-item dropdown nav-li_userIcon">
                    <img src={userIcon} alt="" className="navbar-userIcon" />
                    <a
                      className="nav-link dropdown-toggle text-light"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.user_username}
                    </a>
                    <ul className="dropdown-menu">
                      {/** Profile for USER & STORE **/}
                      {(user.Rol.rol_name === "user" ||
                        user.Rol.rol_name === "store") && (
                        <li>
                          <NavLink className="dropdown-item" to="profile">
                            Profile
                          </NavLink>
                        </li>
                      )}
                      {/** Panel for STAFF **/}
                      {user.Rol.rol_name === "staff" && (
                        <li>
                          <NavLink className="dropdown-item" to="panel/staff">
                            Panel
                          </NavLink>
                        </li>
                      )}

                      {/** Panel for ADMIN **/}
                      {user.Rol.rol_name === "admin" && (
                        <li>
                          <NavLink className="dropdown-item" to="panel/admin">
                            Panel
                          </NavLink>
                        </li>
                      )}

                      <li>
                        <NavLink className="dropdown-item" to="favorite">
                          Favorites
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider bg-light" />
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="/"
                          onClick={logOut}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>

            {/**  ----------- End dinamic content -----------  **/}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
