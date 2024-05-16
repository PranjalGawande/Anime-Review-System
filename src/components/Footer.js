// // import React from "react";
// // import {
// //     FaFacebookF,
// //     FaInstagram,
// //     FaTwitter,
// //     FaLinkedin,
// // } from "react-icons/fa";

// // import ContentWrapper from "./ContentWrapper";

// // // import "./style.scss";

// // const Footer = () => {
// //     return (
// //         <footer className="footer mt-5">
// //             <ContentWrapper>
// //                 <ul className="menuItems">
// //                     <li className="menuItem">Home</li>
// //                     <li className="menuItem">Browse</li>
// //                     {/* <li className="menuItem">About</li>
// //                     <li className="menuItem">Blog</li>
// //                     <li className="menuItem">FAQ</li> */}
// //                 </ul>
// //                 {/* <div className="infoText">
// //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
// //                     do eiusmod tempor incididunt ut labore et dolore magna
// //                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
// //                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
// //                     Duis aute irure dolor in reprehenderit in voluptate velit
// //                     esse cillum dolore eu fugiat nulla pariatur.
// //                 </div> */}

// //             </ContentWrapper>
// //         </footer>
// //     );
// // };

// // export default Footer;

// import React from "react";

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <div className="footer-content">
//                 <div className="footer-logo">
//                 </div>
//                 <ul className="menuItems">
//                     <li className="menuItem text-left">
//                         <p className="text-4xl text-decoration-underline mb-3">ANIMIX</p>
//                         <div>
//                             <ul>
//                                 <li>26/C, Opposite of Infosys gate 1</li>
//                                 <li>Electronics City Phase 1, Hosur Road</li>
//                                 <li>Bengaluru - 560100</li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className="menuItem text-left">
//                         <p className="text-4xl text-decoration-underline mb-3">Support</p>
//                         <div>
//                             <ul>
//                                 <li>For any inquiries or further assistance,</li>
//                                 <li>contact us via email at <a href="mailto:healthsync@support.com">healthsync@support.com</a>,</li>
//                                 <li>or call us at <a href="tel:+911234567890">+91 1234567890</a></li>
//                             </ul>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </footer>

//     );
// };

// export default Footer;

import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                </div>
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
                                <li>contact us via email at <a href="mailto:animix@support.com">animix@support.com</a>,</li>
                                <li>or call us at <a href="tel:+911234567890">+91 1234567890</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
