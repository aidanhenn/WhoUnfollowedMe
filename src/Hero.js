import React from "react";
import "./Hero.css";
import "./App.js";

function Hero() {
  return (
    <body>
      <div class="container">
        <div className="heroContainer">
          <img
            className="unfollowImg"
            src="/images/unfollow.png"
            alt="unfollower"
          ></img>
          <div className="heroContent">
            <h1 className="heroHeader">
              FIND WHO HAS UNFOLLOWED YOU ON INSTAGRAM!
            </h1>
            <p>Find out who has unfollowed you on Instagram without having to sign in.</p>
            <a class="boxes" href="#parentContainer">
              GET STARTED
            </a>
          </div>
          <img
            className="unfollowImg"
            src="/images/unfollow.png"
            alt="unfollower"
          ></img>
        </div>
      </div>
    </body>
  );
}

export default Hero;
