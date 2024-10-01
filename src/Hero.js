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
            <h1 className="heroHeader">Who Unfollowed Me?</h1>
            <p>
              Discover who has unfollowed you on Instagram—no sign-in required,
              and your personal data stays private.
            </p>
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
