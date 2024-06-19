import React from 'react';
import '../page-css/PrivacyPolicy.css'; // Make sure this path matches your project structure
import Header from "../../components/components-js/Header";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p>
          Welcome to our food ordering website. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide to us directly, such as when you create an account, place an order, or contact us. This information may include your name, email address, phone number, delivery address, and payment information.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your information to process and fulfill your orders, communicate with you, improve our services, and comply with legal obligations. We may also use your information to send you promotional offers and updates, but you can opt-out of these communications at any time.
        </p>
        <h2>Information Sharing</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
        </p>
        <h2>Security</h2>
        <p>
          We implement a variety of security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, so we cannot guarantee its absolute security.
        </p>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="http://localhost:3001/Contact">http://localhost:3001/Contact</a>.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
