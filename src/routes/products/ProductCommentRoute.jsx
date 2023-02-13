import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
//Context:
import { UserContext } from "../../context/UserProvider";
//Reducer:
import {
  commentReducer,
  initialStates,
} from "../../reducers/reducer/commentsReducer";
import TYPES_COMMENTS from "../../reducers/types/commentTypes";
//Fetch:
import ManageFetch from "../../utils/manageFetch";
import { URL_API } from "../../utils/URL";
//Components:
import SectionLoader from "../../components/accesories/SectionLoader";
import CommentCard from "../../components/productRoute/CommentCard";
import ModalSendComment from "../../components/productRoute/ModalSendComment";

const ProductCommentRoute = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(commentReducer, initialStates);
  const {
    loading,
    errorFetch,
    comments,
    page,
    totalPages,
    currentPage,
    product,
    modal,
    form,
    errorForm,
  } = states;

  /**   USE EFFECT **/
  useEffect(() => {
    dispatch({ type: TYPES_COMMENTS.setLoading });
    //Get Product:
    const urlProduct = `${URL_API}/product/list/${id}`;
    FetchFunction({ url: urlProduct }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_COMMENTS.setProduct, payload: res.data });
      }
    });

    //Get comments:
    getComments(id);
  }, [id]);

  /**   GET COMMENTS  **/
  function getComments(id) {
    const url = `${URL_API}/comment/list/${id}?page=${page}`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_COMMENTS.setComments, payload: res.data });
      }
    });
  }

  /**   OPEN MODAL  **/
  const OpenModal = (e, commentId) => {
    e.preventDefault();
    dispatch({
      type: TYPES_COMMENTS.openModal,
      payload: { product: id, user: user.user_id, reply: commentId },
    });
  };

  /**   CLOSE MODAL  **/
  const closeModal = (e) => {
    e.preventDefault();
    dispatch({ type: TYPES_COMMENTS.closeModal });
  };

  /**   HANDLE CHANGE  **/
  const handleChange = (e) => {
    dispatch({ type: TYPES_COMMENTS.handleChangeForm, payload: e.target });
  };

  /**   HANDLE SUBMIT COMMENT  **/
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (form.body.trim().length < 3 || form.body.trim().length > 250) {
      return dispatch({
        type: TYPES_COMMENTS.setErrorForm,
        payload: "Body has to be 2-250 characters",
      });
    }
    dispatch({ type: TYPES_COMMENTS.setLoading });
    dispatch({ type: TYPES_COMMENTS.closeModal });
    const url = `${URL_API}/comment/reply`;
    FetchFunction({ url, method: "POST", body: form }).then((res) => {
      if (res.status === 201) {
        getComments(id);
      } else {
        dispatch({
          type: TYPES_COMMENTS.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /*RETURNS: */
  return (
    <div className="routeContainer">
      <h1 className="title">{product?.product_name}</h1>
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
      {/**  COMMENTS SECTION  **/}
      <div className="container-cards_row">
        {comments.length !== 0 &&
          comments.map((c) => (
            <CommentCard key={c.comment_id} comment={c} OpenModal={OpenModal} />
          ))}
      </div>
      {/**  PAGINATION SECTION  **/}
      <section className="pagination-section">
        {/**  BACK BUTTON **/}
        {currentPage === 1 ? (
          <button className="button-disable">Back</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_COMMENTS.backPage })}
          >
            Back
          </button>
        )}

        {<b>{`${currentPage} of ${totalPages}`}</b>}

        {/**  NEXT BUTTON **/}
        {currentPage < totalPages ? (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_COMMENTS.nextPage })}
          >
            Next
          </button>
        ) : (
          <button className="button-disable">Next</button>
        )}
      </section>

      {/** MODAL  **/}

      {modal && (
        <ModalSendComment
          closeModal={closeModal}
          form={form}
          errorForm={errorForm}
          handleChange={handleChange}
          handleSubmitComment={handleSubmitComment}
        />
      )}
    </div>
  );
};

export default ProductCommentRoute;
