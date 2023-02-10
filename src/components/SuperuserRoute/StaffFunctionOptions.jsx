import React from "react";

const StaffFunctionOptions = ({
  usertarget,
  verifyUser,
  unverifyUser,
  suspendUser,
  reactiveUser,
  deleteUser,
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
            <button
              className="button-blue"
              onClick={(e) => verifyUser(e, usertarget.user_id, "staff")}
            >
              Verify
            </button>
          )}

        {usertarget.Rol.rol_name === "store" &&
          usertarget.user_status === "active" && (
            <button
              className="button-blue"
              onClick={(e) => unverifyUser(e, usertarget.user_id, "staff")}
            >
              Unverify
            </button>
          )}

        {usertarget.user_status === "active" ? (
          <button
            className="button-blue"
            onClick={(e) => suspendUser(e, usertarget.user_id, "staff")}
          >
            Suspend
          </button>
        ) : (
          <button
            className="button-blue"
            onClick={(e) => reactiveUser(e, usertarget.user_id, "staff")}
          >
            Reactive
          </button>
        )}

        {usertarget.user_status !== "deleted" && (
          <button
            className="button-blue"
            onClick={(e) => deleteUser(e, usertarget.user_id, "staff")}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(StaffFunctionOptions);
