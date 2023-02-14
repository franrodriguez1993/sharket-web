import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../css/ProductRoute/ProductRoute.css";

//Hook:
import useProductRoute from "../../hooks/useProductRoute";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Components:
import ProductData from "../../components/productRoute/ProductData";
import SellerData from "../../components/productRoute/SellerData";
import CommentSection from "../../components/productRoute/CommentSection";
import SectionLoader from "../../components/accesories/SectionLoader";
import SimilarProducts from "../../components/productRoute/SimilarProducts";
import SellerProducts from "../../components/productRoute/SellerProducts";
import FavoriteSection from "../../components/productRoute/FavoriteSection";
import { UserContext } from "../../context/UserProvider";
import CommentForm from "../../components/productRoute/CommentForm";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const ProductRoute = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    window.scroll(0, 0);
  }, [id]);

  const {
    product,
    loadingProduct,
    error,
    dispatch,
    comments,
    loadingComments,
    commentPage,
    commentTotalPage,
    commentCurrentPage,
    similarProducts,
    sellerProducts,
    favorites,
    loadingFavOperation,
    formComment,
    formError,
    makeFavProduct,
    HCFormComment,
    HSFormComment,
  } = useProductRoute(id, user);
  return (
    <div className="ProductRoute-container">
      {!loadingProduct ? (
        <>
          {Object.keys(product).length !== 0 ? (
            <>
              {/**  PRODUCT AND SELLER SECTION  **/}
              <section className="ProductRoute-principal">
                <ProductData product={product} />
                <SellerData
                  seller={product.user}
                  address={product.user_address}
                  user={user}
                  product={product}
                />
              </section>

              {/**  FAVORITE SECTION **/}
              {user && (
                <>
                  {product.user.user_id !== user.user_id && (
                    <FavoriteSection
                      userFavorites={favorites}
                      product={product.product_id}
                      loadingFavOperation={loadingFavOperation}
                      makeFavProduct={makeFavProduct}
                    />
                  )}
                </>
              )}
              {/**  COMMENTS SECTION **/}
              {comments.length !== 0 ? (
                <>
                  <CommentSection
                    comments={comments}
                    loadingComments={loadingComments}
                    commentPage={commentPage}
                    commentTotalPage={commentTotalPage}
                    commentCurrentPage={commentCurrentPage}
                    dispatch={dispatch}
                  />
                  {user && (
                    <>
                      {user.Rol.rol_name === "user" &&
                        product.user.user_id !== user.user_id && (
                          <CommentForm
                            HCFormComment={HCFormComment}
                            HSFormComment={HSFormComment}
                            formComment={formComment}
                            formError={formError}
                          />
                        )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="commentData-container">
                    <h3 className="commentData-title">Questions to seller</h3>
                    <p>There're no questions yet.</p>
                  </div>
                  {user && (
                    <>
                      {user.Rol.rol_name === "user" &&
                        product.user.user_id !== user.user_id && (
                          <CommentForm
                            HCFormComment={HCFormComment}
                            HSFormComment={HSFormComment}
                            formComment={formComment}
                            formError={formError}
                          />
                        )}
                    </>
                  )}
                </>
              )}

              {/**  SIMILAR PRODUCTS SECTION **/}
              {similarProducts.length !== 0 && (
                <SimilarProducts products={similarProducts} />
              )}
              {/**  SELLER PRODUCTS SECTION **/}
              {sellerProducts.length !== 0 && (
                <SellerProducts
                  products={sellerProducts}
                  seller={product.user.user_username}
                />
              )}
            </>
          ) : (
            <>
              {/** ERROR SECTION **/}
              <section className="productRoute-error">
                <img
                  src="/assets/img/errorShark.png"
                  alt="error-sharknet"
                  className="productRoute-error-img"
                />
                {<h3 className="productRoute-error-msg">{error}</h3>}
              </section>
            </>
          )}
        </>
      ) : (
        <section className="productRoute-Contloader">
          <SectionLoader />
        </section>
      )}
    </div>
  );
};

export default ProductRoute;
