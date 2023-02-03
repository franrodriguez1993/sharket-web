import React, { useEffect, useState } from "react";
//SVG:
import unlikedHeart from "../../svg/heart_unlike.svg";
import likedHeart from "../../svg/heart_like.svg";

//Components:
import SectionLoader from "../accesories/SectionLoader";

const FavoriteSection = ({
  userFavorites,
  product,
  makeFavProduct,
  loadingFavOperation,
}) => {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    if (userFavorites.length === 0) {
      return setFav(false);
    }
    const check = userFavorites.filter((i) => i.product_id === product);
    if (check.length !== 0) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, [userFavorites]);

  return (
    <section className="productRoute-favorite_container">
      {!loadingFavOperation ? (
        <>
          {fav ? (
            <>
              <img
                src={likedHeart}
                alt="favorite"
                className="productRoute-favorite_heart"
                onClick={makeFavProduct}
              />
              <p>This product is in your favorite list</p>
            </>
          ) : (
            <>
              <img
                src={unlikedHeart}
                alt="favorite"
                className="productRoute-favorite_heart"
                onClick={makeFavProduct}
              />
              <p>Add this product to your favorite list</p>
            </>
          )}
        </>
      ) : (
        <SectionLoader />
      )}
    </section>
  );
};

export default FavoriteSection;
