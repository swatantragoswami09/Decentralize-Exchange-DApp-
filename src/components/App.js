import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Main from "./Main";

function App() {
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState("");
  const [token, setToken] = useState({});
  const [ethSwap, setEthSwap] = useState({});
  const [loader, setLoader] = useState(true);

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    if (account !== "") {
      const ethBalance = await web3.eth.getBalance(account);
      setEthBalance(ethBalance);

      // Load Token
      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];
      if (tokenData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        setToken(token);

        let tokenBalance = await token.methods.balanceOf(account).call();
        setTokenBalance(tokenBalance.toString());
      } else {
        window.alert("Token contract not deployed to detected network");
      }

      // Load EthSwap
      const ethSwapData = EthSwap.networks[networkId];

      if (ethSwapData) {
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
        setEthSwap(ethSwap);
      } else {
        window.alert("EthSwap contract not deployed to detected network");
      }
      setLoader(false);
    }
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const buyTokens = (etherAmount) => {
    setLoader(true);
    ethSwap.methods
      .buyTokens()
      .send({
        from: account,
        value: etherAmount,
      })
      .on("transactionHash", (hash) => {
        setLoader(false);
      });
  };
  const sellTokens = (tokenAmount) => {
    setLoader(true);
    token.methods
      .approve(ethSwap.address, tokenAmount)
      .send({
        from: account,
      })
      .on("transactionHash", (hash) => {
        ethSwap.methods
          .sellTokens(tokenAmount)
          .send({
            from: account,
          })
          .on("transactionHash", (hash) => {
            setLoader(false);
          });
      });
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [account, ethBalance]);

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="content mr-auto ml-auto">
              <a
                href="portfolioskg.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              {loader ? (
                <div className="loading"></div>
              ) : (
                <Main
                  ethBalance={ethBalance}
                  tokenBalance={tokenBalance}
                  buyTokens={buyTokens}
                  sellTokens={sellTokens}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
