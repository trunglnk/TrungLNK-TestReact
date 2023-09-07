import React from "react";
import { FaRegCopyright } from "react-icons/fa6";

const FooterAd = () => {
  return (
    <div className="footerAd">
      <div className="year">
        <FaRegCopyright className="icon-copy" />
        2021
      </div>
      <p>Phiên bản 1.0.0</p>
    </div>
  );
};

export default FooterAd;
