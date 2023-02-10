import React from "react";
import { useNavigate } from "react-router-dom";
const SuperuserCard = ({ superuser }) => {
  const navigate = useNavigate();
  return (
    <div className="su-card">
      <div className="su-divisor">
        <p className="su-p">{superuser.user_username}</p>
      </div>
      <div className="su-divisor">
        <p className="su-p">{superuser.user_mail}</p>
      </div>
      <div className="su-divisor">
        <p className="su-p">{superuser.Rol.rol_name}</p>
      </div>
      <div className="su-divisor">
        <button
          className="button-blue"
          onClick={() => navigate(`/panel/admin/log/${superuser.user_id}`)}
        >
          Logs
        </button>
      </div>
    </div>
  );
};

export default SuperuserCard;
