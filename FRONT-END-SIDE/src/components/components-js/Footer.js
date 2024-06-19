// import React from "react";
// import { Link } from "react-router-dom";
// import { ImFacebook2 } from "react-icons/im";
// import { FaTelegram, FaTwitter } from "react-icons/fa";
// import { MdOutlineEmail } from "react-icons/md";

// import "../components-css/Footer.css";

// export default function Footer() {
//   return (
   
//       <div className="FullFooterPage">
//       <div className="allFooter">
//         <div className="FooterFourDiv">
//           <div className="FooterFirstDiv">
//             <h2 className="footerTitle">Lounge</h2>
//             <p>we are the best lounge in DBU this is 
//               make our different from other 
//               that means we are the best for ever</p>
//           </div>

//           <div className="FooterSecondDiv">
//             <h2 className="footerTitle">FastLinks</h2>
//             <Link className="link" to="/Contact">
//             Contact
//           </Link>
//           <Link className="link" to="/About">
//            About
//           </Link>
//           <Link className="link" to="/PrivacyPolicy">
//            privacy policy
//           </Link>

//           </div>
       
//         <div className="FooterFourthDiv">
//         <h2 className="footerTitle">Contact Us</h2>
//           Learn more about our company and mission to provide
//           high-quality products/services to our customers.
         
//         </div>
//         </div>
//         <div className="FooterIcons">
//           <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//             <ImFacebook2 />
//           </a>
//           <a href="https://www.telegram.com" target="_blank" rel="noopener noreferrer">
//             <FaTelegram />
//           </a>
//           <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//             <FaTwitter />
//           </a>
//           <a href="mailto:example@example.com">
//             <MdOutlineEmail />
//           </a>
//         </div>
//        <hr/>
//          <h3>&copy; All Rights Are Reserved</h3> 
//       </div>
//       <hr className="footerHr" />
//     </div>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import "../components-css/Footer.css";

export default function Footer() {
  return (
    <div className="FullFooterPage">
      <div className="allFooter">
        <div className="FooterFourDiv">
          <div className="FooterFirstDiv">
            <h2 className="footerTitle">Welcome to Lounge</h2>
            <p>
              Discover a unique experience at our Lounge, where sophistication
              meets comfort. We pride ourselves on being the premier destination
              in DBU, offering an unparalleled atmosphere that sets us apart.
            </p>
          </div>

          <div className="FooterSecondDiv">
            <h2 className="footerTitle">Fast Links</h2>
            <Link className="link" to="/Contact">
              Contact
            </Link>
            <Link className="link" to="/About">
              About
            </Link>
            <Link className="link" to="/PrivacyPolicy">
              Privacy Policy
            </Link>
          </div>

          <div className="FooterFourthDiv">
            <h2 className="footerTitle">Contact Us</h2>
            Reach out to learn more about our commitment to providing
            exceptional products and services. We are dedicated to ensuring
            customer satisfaction through innovation and reliability.
          </div>
        </div>

        <div className="FooterIcons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImFacebook2 />
          </a>
          <a
            href="https://www.telegram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a href="mailto:example@example.com">
            <MdOutlineEmail />
          </a>
        </div>
        <hr />
        <h3>&copy; All Rights Reserved</h3>
      </div>
      <hr className="footerHr" />
    </div>
  );
}
