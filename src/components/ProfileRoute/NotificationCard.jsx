import React from "react";
import { useNavigate } from "react-router-dom";
import ManageFetch from "../../utils/manageFetch";
import { URL_API } from "../../utils/URL";
import "../../css/ProfileRoute/NotificationCard.css";
const NotificationCard = ({ notification }) => {
  const navigate = useNavigate();
  if (!notification) return;
  const { FetchFunction } = ManageFetch();

  const NotificationHandler = (e) => {
    if (
      notification.notification_type === "PRODUCT_SOLD" ||
      notification.notification_type === "RESPONSE_RECEIVED"
    ) {
      if (notification.notification_seen === false) {
        checkSeenNotification(notification.notification_id);
      }
      navigateProduct(notification.product_id);
    } else if (notification.notification_type === "NEW_COMMENT") {
      if (notification.notification_seen === false) {
        checkSeenNotification(notification.notification_id);
      }
      navigate(`/product/comments/${notification.product_id}`);
    }
  };

  function navigateProduct(id) {
    navigate(`/product/${id}`);
  }

  function checkSeenNotification(id) {
    const url = `${URL_API}/notification/seen/${id}`;
    FetchFunction({ url, method: "POST" });
  }
  return (
    <article
      className={`notificationCard ${
        notification.notification_seen === true && "notification-seen"
      }`}
      onClick={(e) => NotificationHandler()}
    >
      <div className="notification-product">
        <img
          src={
            notification.product.product_thumbnail || "/assets/img/default.jpg"
          }
          alt="product"
          className="notification-img"
        />
        <b className="notification-product_name">
          {notification.product.product_name}
        </b>
      </div>
      <div className="notification-type">
        {notification.notification_type === "NEW_COMMENT" && (
          <b> You have a new comment in your product</b>
        )}
        {notification.notification_type === "PRODUCT_SOLD" && (
          <b> Your product has been sold</b>
        )}
        {notification.notification_type === "RESPONSE_RECEIVED" && (
          <b> Your question has been answered</b>
        )}
      </div>
    </article>
  );
};

export default NotificationCard;
