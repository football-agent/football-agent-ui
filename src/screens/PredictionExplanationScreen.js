import React from "react";

export default function PredictionExplanationScreen() {
  return (
    <div>
      <p
        style={{
          fontSize: "3.5rem",
          fontFamily: "MyFont",
          color: "#455d58",
          padding: "1",
          marginBlock: "20px",
        }}
      >
        How does our prediction work?
      </p>

      <p
        style={{
          fontSize: "1.5rem",
          fontFamily: "MyFont",
          color: "#455d58",
          padding: "40px",
          marginBlock: "20px",
        }}
      >
        We use big data and artificial intelligence to generate our salary
        predictions. For this we gather a huge amount of data from public and
        accessible databases about players, which includes features like number
        of scored goals or their play time. Using these informations we are able
        to generate a mathematical model to analyse statistical properties of
        those features in order to determain their relevance for they respective
        pay a player gets. For that we use a machine learning model. The model
        relays on regularized gradient boosting (XGBoost)
      </p>
    </div>
  );
}
