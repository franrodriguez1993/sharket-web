import React, { useEffect, useState } from "react";

//Logos:
import badLogo from "../../svg/bad_reputation.svg";
import regularLogo from "../../svg/regular_reputation.svg";
import goodLogo from "../../svg/good_reputation.svg";
import veryGoodLogo from "../../svg/very_good_reputation.svg";
import excellentLogo from "../../svg/excellent_reputation.svg";
const initialState = { bad: 0, regular: 0, good: 0, veryGood: 0, excellent: 0 };
const ReputationSeller = ({ reputations }) => {
  const [score, setScore] = useState(initialState);
  const [repUser, setRepUser] = useState("");
  const [noRepu, setNoRepu] = useState(false);

  useEffect(() => {
    if (!reputations) return;
    if (reputations.length === 0) return setNoRepu(true);
    getScore(reputations);
  }, [reputations]);

  function getScore(list) {
    const scorer = { bad: 0, regular: 0, good: 0, veryGood: 0, excellent: 0 };
    //Seteamos la calificaciones:
    list.forEach((r) => {
      if (r.reputation_score.rs_name === "excellent") {
        scorer.excellent += 1;
      } else if (r.reputation_score.rs_name === "very good") {
        scorer.veryGood += 1;
      } else if (r.reputation_score.rs_name === "good") {
        scorer.good += 1;
      } else if (r.reputation_score.rs_name === "regular") {
        scorer.regular += 1;
      } else if (r.reputation_score.rs_name === "bad") {
        scorer.bad += 1;
      }
    });
    setScore(scorer);
    //Obtenemos la calificación que más puntos tiene:
    const repu = Object.keys(scorer).reduce((a, b) =>
      scorer[a] > scorer[b] ? a : b
    );
    setRepUser(repu);
  }

  return (
    <article className="SellerData-reputation">
      <b>Seller reputation</b>
      <i>Based in recent sells</i>
      {noRepu && (
        <p className="p-repu-noScored">This seller has no scored sells yet.</p>
      )}
      {repUser && (
        <>
          {repUser === "excellent" && (
            <>
              <img
                src={excellentLogo}
                alt="user-img"
                className="reputation-logo"
              />
              <p className="p-repu-okay">
                This seller has {score.excellent} excellent scored sells
              </p>
            </>
          )}
          {repUser === "veryGood" && (
            <>
              <img
                src={veryGoodLogo}
                alt="user-img"
                className="reputation-logo"
              />
              <p className="p-repu-okay">
                This seller has {score.veryGood} very good scored sells
              </p>
            </>
          )}
          {repUser === "good" && (
            <>
              <img src={goodLogo} alt="user-img" className="reputation-logo" />
              <p className="p-repu-okay">
                This seller has {score.good} good scored sells
              </p>
            </>
          )}
          {repUser === "regular" && (
            <>
              <img
                src={regularLogo}
                alt="user-img"
                className="reputation-logo"
              />
              <p className="p-repu-notOkay">
                This seller has {score.regular} regular scored sells
              </p>
            </>
          )}
          {repUser === "bad" && (
            <>
              <img src={badLogo} alt="user-img" className="reputation-logo" />
              <p className="p-repu-notOkay">
                This seller has {score.bad} bad scored sells
              </p>
            </>
          )}
        </>
      )}
    </article>
  );
};

export default React.memo(ReputationSeller);
