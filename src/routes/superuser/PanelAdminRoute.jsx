import React, { useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "../../css/PanelRoute/PanelRoute.css";
import { UserContext } from "../../context/UserProvider";
import ManageAdminRoute from "./ManageAdminRoute";
import SuperuserList from "./SuperuserList";
import SuperuserLog from "./SuperuserLog";
const PanelAdminRoute = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) return;
    if (user.Rol.rol_name !== "admin") {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div className="routeContainer">
        <header className="panel-header">
          <h1 className="panel-header_title">Panel</h1>
        </header>
        <nav className="panel-nav">
          <button
            className="button-blue"
            onClick={() => navigate("/panel/admin/manage")}
          >
            Manage user
          </button>
          <button
            className="button-blue"
            onClick={() => navigate("/panel/admin/log")}
          >
            Superusers
          </button>
        </nav>
      </div>

      {/** ROUTER  **/}
      <Routes>
        <Route path="/manage" element={<ManageAdminRoute />} />
        <Route path="/log" element={<SuperuserList />} />
        <Route path="/log/:id" element={<SuperuserLog />} />
      </Routes>
    </>
  );
};

export default PanelAdminRoute;
