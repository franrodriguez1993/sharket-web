import React from "react";

const LogsCard = ({ log }) => {
  return (
    <article className="logs-card">
      <div className="logs-divisor">
        <p>
          <b>Action: </b>
          {log.action.alu_action}
        </p>
      </div>

      <div className="logs-divisor">
        <p>
          <b>Target: </b>
          {log.action.user.user_mail}
        </p>
      </div>
      <div className="logs-divisor">
        <p>{log.createdAt}</p>
      </div>
    </article>
  );
};

export default LogsCard;
