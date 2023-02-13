import React, { useContext, useEffect, useRef } from "react";
import useNotification from "../../hooks/useNotification";
//Context:
import { UserContext } from "../../context/UserProvider";

//Components:
import NotificationCard from "../../components/ProfileRoute/NotificationCard";
import SectionLoader from "../../components/accesories/SectionLoader";
const NotificationRoute = () => {
  const {
    notifications,
    loading,
    errorFetch,
    getNotifications,
    msg,
    MoreNotification,
  } = useNotification();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user) return;
    getNotifications(user.user_id);
  }, [user]);

  //Scroller handler:
  const scrollFunction = () => {
    const height = scrollInf.current.scrollHeight;
    const topScroll = scrollInf.current.scrollTop;
    const clientHeight = scrollInf.current.clientHeight;
    const bottom = height - topScroll === clientHeight;

    if (bottom) {
      MoreNotification(user.user_id);
    }
  };
  const scrollInf = useRef();
  return (
    <div className="routeContainer">
      <h2 className="fw-bolder mt-2">Notifications</h2>

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
      <section
        className="container-cards_row scroll-div"
        ref={scrollInf}
        onScroll={(e) => scrollFunction(e)}
      >
        {!loading && notifications.length !== 0 ? (
          <>
            {notifications.map((n) => (
              <NotificationCard key={n.notification_id} notification={n} />
            ))}
            {msg && <i>{msg}</i>}
          </>
        ) : (
          <div>You don't have any notification</div>
        )}
      </section>
    </div>
  );
};

export default NotificationRoute;
