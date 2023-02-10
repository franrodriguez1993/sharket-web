import React from "react";

const AdminFunctionOption = ({
  usertarget,
  verifyUser,
  unverifyUser,
  suspendUser,
  reactiveUser,
  deleteUser,
  upgradeAdmin,
  downgradeAdmin,
  upgradeStaff,
  downgradeStaff,
}) => {
  return (
    <div className="usertarget-container">
      {/** DATA**/}
      <div className="usertarget-data">
        <p className="usertarget-p">
          <b className="usertarget-b">Username: </b> {usertarget.user_username}
        </p>
        <p className="usertarget-p">
          <b className="usertarget-b">Mail: </b> {usertarget.user_mail}
        </p>
      </div>
      {/** ROL**/}
      <div className="usertarget-rol">
        <p className="usertarget-p">
          <b className="usertarget-b">Rol: </b> {usertarget.Rol.rol_name}
        </p>
        <p className="usertarget-p">
          <b className="usertarget-b">Status: </b> {usertarget.user_status}
        </p>
      </div>

      {/** OPTIONS**/}
      <div className="usertarget-options">
        {usertarget.Rol.rol_name === "user" &&
          usertarget.user_status === "active" && (
            <>
              <button
                className="button-blue"
                onClick={(e) => verifyUser(e, usertarget.user_id)}
              >
                Verify
              </button>
              <button
                className="button-blue"
                onClick={(e) => upgradeAdmin(e, usertarget.user_id)}
              >
                Make admin
              </button>
              <button
                className="button-blue"
                onClick={(e) => upgradeStaff(e, usertarget.user_id)}
              >
                Make staff
              </button>
            </>
          )}
        {usertarget.Rol.rol_name === "admin" &&
          usertarget.user_status === "active" && (
            <>
              <button
                className="button-blue"
                onClick={(e) => downgradeAdmin(e, usertarget.user_id)}
              >
                downgrade admin
              </button>
              <button
                className="button-blue"
                onClick={(e) => upgradeStaff(e, usertarget.user_id)}
              >
                Make staff
              </button>
            </>
          )}

        {usertarget.Rol.rol_name === "staff" &&
          usertarget.user_status === "active" && (
            <>
              <button
                className="button-blue"
                onClick={(e) => downgradeStaff(e, usertarget.user_id)}
              >
                downgrade staff
              </button>
              <button
                className="button-blue"
                onClick={(e) => upgradeAdmin(e, usertarget.user_id)}
              >
                Make admin
              </button>
            </>
          )}

        {usertarget.Rol.rol_name === "store" && (
          <button
            className="button-blue"
            onClick={(e) => unverifyUser(e, usertarget.user_id)}
          >
            Unverify
          </button>
        )}

        {usertarget.user_status === "active" ? (
          <button
            className="button-blue"
            onClick={(e) => suspendUser(e, usertarget.user_id, "admin")}
          >
            Suspend
          </button>
        ) : (
          <button
            className="button-blue"
            onClick={(e) => reactiveUser(e, usertarget.user_id, "admin")}
          >
            Reactive
          </button>
        )}

        {usertarget.user_status !== "deleted" && (
          <button
            className="button-blue"
            onClick={(e) => deleteUser(e, usertarget.user_id, "admin")}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminFunctionOption;
