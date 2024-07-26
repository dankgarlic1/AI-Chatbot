import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Want to connect? Reach out to me on LinkedIn
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://www.linkedin.com/in/harshit-raizada-32b909231/"}
            >
              <img
                src="linkedin.png" // Replace with the path to your image
                alt="LinkedIn"
                style={{
                  width: "30px",
                  height: "30px",
                  verticalAlign: "middle",
                  marginRight: "10px",
                }}
              />
              Harshit Raizada
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
