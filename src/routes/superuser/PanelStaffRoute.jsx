import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/PanelRoute/PanelRoute.css";
//Hook:
import useSuperuser from "../../hooks/useSuperuser";
//Context:
import { UserContext } from "../../context/UserProvider";
//Components:
import SearchForm from "../../components/SuperuserRoute/SearchForm";
import SectionLoader from "../../components/accesories/SectionLoader";
import StaffFunctionOptions from "../../components/SuperuserRoute/StaffFunctionOptions";

const PanelStaffRoute = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    usertarget,
    loading,
    errorFetch,
    HCSearch,
    search,
    HSSearch,
    successMsg,
    verifyUser,
    unverifyUser,
    suspendUser,
    reactiveUser,
    deleteUser,
  } = useSuperuser(user);

  useEffect(() => {
    if (!user) return;
    if (user.Rol.rol_name !== "staff") {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="routeContainer">
      <header className="panel-header">
        <h1 className="panel-header_title">Panel</h1>
      </header>

      <h2 className="mt-4 fw-bolder">Manage user</h2>

      {/**  ERROR FETCH   **/}
      {errorFetch && (
        <div className="alert-error-container">
          <p className="text-error">{errorFetch}</p>
        </div>
      )}

      {/**  SUCCESS MSG   **/}
      {successMsg && (
        <div className="alert-success-container">
          <p className="text-alert-success">{successMsg}</p>
        </div>
      )}

      {/**  LOADING  **/}
      {loading && (
        <div className="modal-container">
          <SectionLoader />
        </div>
      )}

      <section className="panel-body">
        {/**  FORM SEARCH  **/}
        <SearchForm
          HCSearch={HCSearch}
          search={search}
          HSSearch={HSSearch}
          mode={"staff"}
        />

        {/**  USERTARGET OPTIONS  **/}
        {Object.keys(usertarget).length !== 0 && (
          <StaffFunctionOptions
            usertarget={usertarget}
            verifyUser={verifyUser}
            unverifyUser={unverifyUser}
            suspendUser={suspendUser}
            reactiveUser={reactiveUser}
            deleteUser={deleteUser}
          />
        )}
      </section>
    </div>
  );
};

export default PanelStaffRoute;
