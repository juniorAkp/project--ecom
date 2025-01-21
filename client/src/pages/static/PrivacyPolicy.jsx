import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6">Last updated: 21/01/2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Luminaria. Your privacy is important to us, and
          this Privacy Policy outlines how we collect, use, and protect your
          information when you use our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc ml-6">
          <li>Personal information, such as your name, email address, and phone number.</li>
          <li>Payment information for purchases made on our site.</li>
          <li>Usage data, including IP addresses, browser type, and pages visited.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>Your information may be used for the following purposes:</p>
        <ul className="list-disc ml-6">
          <li>To provide and improve our services.</li>
          <li>To process transactions and send purchase confirmations.</li>
          <li>To communicate with you about updates, promotions, or support.</li>
          <li>To analyze usage and improve website performance.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
        <p>We do not sell or rent your personal information. However, we may share it with:</p>
        <ul className="list-disc ml-6">
          <li>Service providers that help us operate our website and business.</li>
          <li>Law enforcement, if required by law or to protect our legal rights.</li>
          <li>Third parties in the event of a merger, acquisition, or sale of assets.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking</h2>
        <p>
          Our website uses cookies and similar tracking technologies to enhance
          your experience and analyze site usage. You can manage your cookie
          preferences through your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, loss, or misuse. However, no data transmission
          over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
        <p>You have the following rights regarding your personal information:</p>
        <ul className="list-disc ml-6">
          <li>Access and request a copy of your data.</li>
          <li>Request corrections to your data.</li>
          <li>Request the deletion of your data.</li>
          <li>Opt-out of certain data processing activities.</li>
        </ul>
        <p>To exercise these rights, please contact us at Luminaria@co.com .</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for their privacy practices and encourage you to review
          their policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the &quot;Last updated&quot; date will be revised
          accordingly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <address className="not-italic">
        Luminaria  <br />
        University of Ghana Legon <br />
        Luminaria@co.com <br />
        +233 597090312
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
