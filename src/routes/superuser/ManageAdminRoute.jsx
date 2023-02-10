import React, { useContext } from "react";

//Hook:
import useSuperuser from "../../hooks/useSuperuser";
//Context:
import { UserContext } from "../../context/UserProvider";
//Components:
import SearchForm from "../../components/SuperuserRoute/SearchForm";
import SectionLoader from "../../components/accesories/SectionLoader";
import AdminFunctionOption from "../../components/SuperuserRoute/AdminFunctionOption";

const ManageAdminRoute = () => {
  const { user } = useContext(UserContext);

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
    upgradeAdmin,
    downgradeAdmin,
    upgradeStaff,
    downgradeStaff,
  } = useSuperuser(user);

  return (
    <div className="routeContainer">
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
          mode={"admin"}
        />

        {/**  USERTARGET OPTIONS  **/}
        {Object.keys(usertarget).length !== 0 && (
          <AdminFunctionOption
            usertarget={usertarget}
            verifyUser={verifyUser}
            unverifyUser={unverifyUser}
            suspendUser={suspendUser}
            reactiveUser={reactiveUser}
            deleteUser={deleteUser}
            upgradeAdmin={upgradeAdmin}
            downgradeAdmin={downgradeAdmin}
            upgradeStaff={upgradeStaff}
            downgradeStaff={downgradeStaff}
          />
        )}
      </section>
    </div>
  );
};

export default ManageAdminRoute;
