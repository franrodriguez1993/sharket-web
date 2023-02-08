import React, { useContext } from "react";
import "../../css/ProfileRoute/ProfileRoute.css";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
const ProfileRoute = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="routeContainer">
      <h1 className="title">Profile</h1>
      <section className="profile-header">
        <nav className="profile-nav">
          <button
            className="button-blue"
            onClick={() => navigate("/profile/data")}
          >
            Update personal data
          </button>
          <button
            className="button-blue"
            onClick={() => navigate("/profile/mail")}
          >
            Change Email
          </button>
          <button
            className="button-blue"
            onClick={() => navigate("/profile/password")}
          >
            Change Password
          </button>
          <button className="button-blue">Update photo</button>
          <button className="button-blue">Birthday</button>
          <button className="button-blue">Address</button>
          <button className="button-blue">Credit Card</button>
        </nav>
        <article className="profile-data">
          <h3 className="title">Personal data</h3>
          <p>
            <b>Username: </b>
            {user.user_username}
          </p>
          <p>
            <b>Mail: </b>
            {user.user_mail}
          </p>
          <p>
            <b>Name: </b>
            {user.user_name || "----"}
          </p>
          <p>
            <b>Lastname: </b>
            {user.user_lastname || "----"}
          </p>
          <p>
            <b>DNI: </b>
            {user.user_dni || "----"}
          </p>
          <p>
            <b>Phone: </b>
            {user.user_phone || "----"}
          </p>
        </article>
      </section>
    </div>
  );
};

export default ProfileRoute;
