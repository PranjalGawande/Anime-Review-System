import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo"></div>
        <ul className="menuItems">
          <li className="menuItem">
            <p className="title">ANIMIX</p>
            <div className="address">
              <ul>
                <li>26/C, Opposite of Infosys gate 1</li>
                <li>Electronics City Phase 1, Hosur Road</li>
                <li>Bengaluru - 560100</li>
              </ul>
            </div>
          </li>
          <li className="menuItem">
            <p className="title">Support</p>
            <div className="address">
              <ul>
                <li>For any inquiries or further assistance,</li>
                <li>
                  contact us via email at{" "}
                  <a href="mailto:animix@support.com">animix@support.com</a>,
                </li>
                <li>
                  or call us at <a href="tel:+911234567890">+91 1234567890</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
