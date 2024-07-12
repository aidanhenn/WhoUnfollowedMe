import React, { useEffect } from "react";
import "./FAQ.css"; // Import the stylesheet

function FAQ() {
  useEffect(() => {
    // Function to handle click events on FAQ questions
    const handleQuestionClick = () => {
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
          // Toggle the display of the answer
          answer.style.display =
            answer.style.display === "block" ? "none" : "block";
        });
      });
    };

    // Attach event listeners once the component is mounted
    handleQuestionClick();

    // Clean up event listeners if the component unmounts (optional)
    return () => {
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div>
      <h1 className="faq-header">FAQ</h1>
      <div className="faq-container">
        <div className="faq-item">
          <div className="faq-question">
            How do I download my Instagram data?
          </div>
          <div className="faq-answer">
            Follow the steps{" "}
            <a
              href="https://help.instagram.com/181231772500920"
              target="_blank"
              rel="noreferrer"
            >
              HERE
            </a>{" "}
            to download your Instagram data.
            <br />
            <br /> <b>Make sure to download it in JSON format.</b>.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">Which files should I upload?</div>
          <div className="faq-answer">
            1.) Go to your downloads <br />
            <br />
            2.) Unzip the folder that looks something like:
            instagram-username-2024-01-01-abcdefg <br />
            <br />
            3.) Go to the file path: connections{`>`}followers_and_following{" "}
            <br />
            <br />
            4.) Find and upload the <b>followers_1.JSON</b> and{" "}
            <b>following.JSON</b> files
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">What is the list of names shown?</div>
          <div className="faq-answer">
            The list shows the users who are not following you back, oftentimes
            these are people who were once following you and have unfollowed
            you.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">Is any of my data saved?</div>
          <div className="faq-answer">No, none of your data will be saved.</div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
