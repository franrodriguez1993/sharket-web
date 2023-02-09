import React, { useContext } from "react";
import SectionLoader from "../../components/accesories/SectionLoader";
import { UserContext } from "../../context/UserProvider";
//Reducers:
import useProfile from "../../hooks/useProfile";

const ChangeImageRoute = () => {
  const { user, logIn, token } = useContext(UserContext);
  const { loading, HCImage, HSImage, imageForm, errorFetch } = useProfile(
    user,
    token,
    logIn
  );
  return (
    <div className="routeContainer">
      <h1 className="title">Update profile image</h1>

      {/**  ERROR FETCH   **/}
      {errorFetch && (
        <div className="alert-error-container">
          <p className="text-error">{errorFetch}</p>
        </div>
      )}

      {/**  LOADING  **/}
      {loading && (
        <div className="modal-container">
          <SectionLoader />
        </div>
      )}

      <form className="form-container" onSubmit={HSImage}>
        {/*PREVIEW IMAGE */}
        <img
          src={imageForm.preview || "/assets/img/default.jpg"}
          alt="image-preview"
          className="img-profile_change"
        />
        <input type="file" onChange={HCImage} />

        <button className="button-blue">Submit</button>
      </form>
    </div>
  );
};

export default ChangeImageRoute;
