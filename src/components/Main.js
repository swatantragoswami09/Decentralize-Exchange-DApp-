import React, { useEffect, useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

function Main({ ethBalance, tokenBalance, buyTokens, sellTokens }) {
  const [currentForm, setCurrentForm] = useState("buy");
  const [content, setContent] = useState();
  useEffect(() => {
    currentForm === "buy"
      ? setContent(
          <BuyForm
            ethBalance={ethBalance}
            tokenBalance={tokenBalance}
            buyTokens={buyTokens}
          />
        )
      : setContent(
          <SellForm
            ethBalance={ethBalance}
            tokenBalance={tokenBalance}
            sellTokens={sellTokens}
          />
        );
  });

  return (
    <div id="content" className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-light"
          onClick={(event) => {
            setCurrentForm("buy");
          }}
        >
          Buy
        </button>
        <span>&lt; &nbsp; &gt;</span>
        <button
          className="btn btn-light"
          onClick={(event) => {
            setCurrentForm("sell");
          }}
        >
          Sell
        </button>
      </div>
      <div className="card mb-4 ">
        <div className="card-body">{content}</div>
      </div>
    </div>
  );
}

export default Main;
