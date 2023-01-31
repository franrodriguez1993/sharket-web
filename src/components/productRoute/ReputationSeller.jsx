import React, { useEffect, useState } from "react";
const initialState = { bad: 0, regular: 0, good: 0, veryGood: 0, excellent: 0 };
const ReputationSeller = ({ reputations }) => {
  const [score, setScore] = useState(initialState);
  console.log(reputations);
  const [repUser, setRepUser] = useState("");

  useEffect(() => {
    if (!reputations) return;
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
    <article>
      <b>Seller reputation</b>
      {score && <p>{score.excellent}</p>}
    </article>
  );
};

export default React.memo(ReputationSeller);
