import Identicon from "identicon.js";
import React from "react";

function Navbar({ account }) {
  return (
    <nav className="navbar navbar-black fixed-top bg-dark flex-md-nowrap shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="http://portfolioskg.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        PuchiSwap
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-secondary">
            <small id="account" style={{ fontSize: "20px" }}>
              {account}
            </small>
          </small>
          {account ? (
            <img
              className="ml-2"
              width="30"
              height="30"
              src={`data:image/png;base64,${new Identicon(
                account,
                30
              ).toString()}`}
            />
          ) : (
            <span></span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
