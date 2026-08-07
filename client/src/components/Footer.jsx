import React from "react";
import "./Footer.css";
import { MoveRightIcon } from "lucide-react";
import Logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="logo">
          <img src={Logo} alt=""   />
          <div className="text">
            <h1>Ready to Build Your Dream Resume?</h1>
            <p>
              Join thousands of profestiomals who got hired with Al Resume
              Builder.
            </p>
          </div>
        </div>
        <div className="btn">
          <button>
            Create My Resume Now
            <MoveRightIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
