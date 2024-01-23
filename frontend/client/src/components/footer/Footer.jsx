import React from "react";
import "./Footer.css";
// import "./footer.scss";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-44">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8 static-bottom-0"
      >
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
