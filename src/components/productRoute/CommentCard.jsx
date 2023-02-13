import React from "react";
import "../../css/ProductRoute/CommentCard.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

const CommentCard = ({ comment, OpenModal }) => {
  return (
    <article
      className="commentcard"
      onClick={(e) => {
        comment.comments.length === 0 && OpenModal(e, comment.comment_id);
      }}
    >
      <i className="commentcard-date">
        <ReactTimeAgo date={Date.parse(comment.createdAt)} locale="en-US" />
      </i>
      <div className="commentcard-parent">
        <b className="commentcard-username">{comment.user.user_username}: </b>
        <p className="commentcard-body_parent">{comment.comment_body}</p>
      </div>
      {comment.comments.length !== 0 && (
        <div className="commentcard-son">
          <b className="commentcard-you">You: </b>
          <i className="commentcard-body_son">
            {comment.comments[0].comment_body}
          </i>
        </div>
      )}
    </article>
  );
};

export default CommentCard;
