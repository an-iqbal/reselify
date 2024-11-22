import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
    return (
        <Layout title={'Privacy Policy'}>
            <div
                style={{
                    backgroundColor: "#131914", // Dark background with a subtle green tint
                    padding: "50px",
                    minHeight: "100vh",
                    color: "#e0e0e0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1 style={{ color: "#28a745", marginBottom: "30px" }}>Privacy Policy</h1>

                <div style={{ width: "80%", textAlign: "justify", lineHeight: "1.8" }}>
                    <p>
                        At Resellify, we are committed to safeguarding your privacy and
                        ensuring that your personal information is protected. Our privacy
                        practices are designed to keep your data secure, transparent, and
                        limited to the purposes you consent to. We value the trust you
                        place in us and aim to be fully transparent about how we use and
                        protect your information.
                    </p>

                    <h3 style={{ color: "#28a745", marginTop: "20px" }}>Our Commitment</h3>
                    <p>
                        We are dedicated to implementing best practices to secure your
                        data. From the moment you sign up, we employ secure systems and
                        encryption methods to keep your personal data confidential and safe.
                        Resellify does not share your information with third parties unless
                        explicitly needed to provide or improve our services, and always
                        with your consent.
                    </p>

                    <h3 style={{ color: "#28a745", marginTop: "20px" }}>Transparency</h3>
                    <p>
                        We believe in clarity and transparency. Our privacy policy outlines
                        every aspect of data collection, including what data we collect, how
                        we use it, and your rights regarding your information. We’re here to
                        answer any questions, and we strive to make it easy to manage your
                        privacy preferences.
                    </p>

                    <h3 style={{ color: "#28a745", marginTop: "20px" }}>Your Control</h3>
                    <p>
                        We provide you with tools to manage your personal information. You
                        have the right to access, update, or delete your data at any time.
                        By upholding these values, we keep our promise to you: Resellify is a
                        platform that prioritizes user privacy and respects your control over
                        personal information.
                    </p>

                    <h3 style={{ color: "#28a745", marginTop: "20px" }}>Data Security</h3>
                    <p>
                        Our team continuously monitors for potential security threats and
                        applies the latest data protection protocols. From using industry-standard
                        encryption to regularly updating our security measures, we work
                        tirelessly to keep your data secure.
                    </p>

                    <p style={{ marginTop: "30px", fontSize: "1.1em", fontWeight: "bold", color: "#28a745" }}>
                        At Resellify, your privacy is our priority. We’re here to uphold
                        the trust you place in us, every step of the way.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
