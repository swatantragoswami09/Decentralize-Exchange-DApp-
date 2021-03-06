import React, { useRef, useState } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";

function SellForm({ ethBalance, tokenBalance, sellTokens }) {
  let inputRef = useRef(null);
  const [output, setOutput] = useState(0);
  return (
    <form
      className="mb-3"
      onSubmit={(event) => {
        event.preventDefault();
        let etherAmount;
        console.log(inputRef.current.value);
        etherAmount = inputRef.current.value.toString();
        etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
        sellTokens(etherAmount);
      }}
    >
      <div>
        <label className="float-left">
          <b>Input</b>
        </label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(tokenBalance, "ether")}
        </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          onChange={(event) => {
            const tokenAmount = event.target.value.toString();
            setOutput(tokenAmount / 100);
          }}
          ref={inputRef}
          className="form-control form-control-lg"
          placeholder="0"
          required
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={tokenLogo} height="32" alt="" />
            &nbsp; DApp
          </div>
        </div>
      </div>
      <div>
        <label className="float-left">
          <b>Output</b>
        </label>
        <span className="float-right text-muted">
          Balance:{window.web3.utils.fromWei(ethBalance, "ether")}
        </span>
      </div>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="0"
          value={output}
          disabled
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={ethLogo} height="32" alt="" />
            &nbsp;&nbsp;&nbsp; ETH
          </div>
        </div>
      </div>
      <div className="mb-5">
        <span className="float-left text-muted">Exchange Rate</span>
        <span className="float-right text-muted">100 DApp = 1 Eth</span>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">
        SWAP!
      </button>
    </form>
  );
}

export default SellForm;
