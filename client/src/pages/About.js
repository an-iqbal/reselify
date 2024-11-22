import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout title={'About Reselify'}>
            {/* Background Section */}
            <div
                className="about-background"
                style={{
                    position: "relative",
                    padding: "100px 20px",
                    color: "#f5f5f5",
                    backgroundImage: `url('https://images.unsplash.com/photo-1585119192228-f072c53bc55c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvbGx1dGlvbnxlbnwwfHwwfHx8MA%3D%3D')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    textAlign: "center",
                    zIndex: 1,
                }}
            >
                {/* Dark Overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        zIndex: -1
                    }}
                ></div>

                {/* Intro Section */}
                <div className="container">
                    <h1 style={{ fontSize: "3.5rem", color: "#28a745", fontWeight: "bold", marginBottom: "20px" }}>
                        About Resellify
                    </h1>
                    <p style={{ fontSize: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
                        Reselify offers a sustainable and affordable way for students to buy and sell items within campus. Join us in building a circular economy that reduces waste and promotes conscious consumption.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-5" style={{ backgroundColor: "#121212", color: "#e0e0e0" }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: "2.5rem", color: "#28a745", marginBottom: "20px" }}>Our Story</h2>
                    <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
                        Reselify was born from a commitment to make student life more sustainable and affordable. Our platform empowers students to keep items in circulation within their community, reducing the environmental impact of waste and unnecessary production.
                    </p>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="py-5" style={{ backgroundColor: "#1c1c1c", color: "#e0e0e0" }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: "2.5rem", color: "#28a745", marginBottom: "20px" }}>Our Impact</h2>
                    <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
                        By reducing waste and fostering a circular economy, Reselify contributes positively to the environment. Every transaction supports resource conservation, reduces carbon emissions, and encourages a sustainable lifestyle on campus.
                    </p>
                </div>
            </section>

            {/* Our Vision Section */}
            <section className="py-5" style={{ backgroundColor: "#121212", color: "#e0e0e0" }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: "2.5rem", color: "#28a745", marginBottom: "20px" }}>Our Vision</h2>
                    <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
                        Our vision is to create a community where students can easily access quality products while fostering a sustainable campus culture. Join us in making eco-conscious decisions and supporting a green future.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default About;
