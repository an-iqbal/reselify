import React from "react";
import Layout from "./../components/Layout/Layout";

const Contact = () => {
    const contacts = [
        {
            id: 1,
            name: "Anwar Iqbal",
            phone: "+91 7306598167",
            email: "anwariqbal@gmail.com",
            imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQHBxN9PH8qAaA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693715219979?e=1736985600&v=beta&t=7pR1T5go6eVMtghZbc9wzkWBkGF0gfvHEA18gvZJdwQ",
        },
        {
            id: 2,
            name: "Shanky Barak",
            phone: "+91 93066 66166",
            email: "shankybarak@gmail.com",
            imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQEMBmaZxNZONA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1689661076628?e=1736985600&v=beta&t=n3bmDIo1Hr7Ehv8gTp-OvK7JvR0Z9Sfe0xjNRju57Bs",
        },
        {
            id: 3,
            name: "Akash Prajapati",
            phone: "+91 97256 35579",
            email: "akashprajapati@gmail.com",
            imgSrc: "https://media.licdn.com/dms/image/v2/C4D03AQHy1bxgYxFZbg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1662209506185?e=1736985600&v=beta&t=tvlj3JA-eYL0DpElsNXxGMlQH4_vxYhlkAFjbCONbEs",
        },
        {
            id: 4,
            name: "Dr. Senthil Kumar T.",
            phone: "+91 98429 77522",
            email: "t_senthilkumar@cb.amrita.edu",
            imgSrc: "https://webfiles.amrita.edu/2014/01/hhLccN6D-Dr-Senthil-Kumar-T_associate-professor_cse_engineering_coimbatore.jpg",
        },
    ];

    return (
        <Layout title={'Contact Us'}>
            <div
                style={{
                    backgroundColor: "#131914",
                    padding: "0",
                    margin: "0",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1
                    className="text-center"
                    style={{ color: "#28a745", marginBottom: "50px" }}
                >
                    Contact Us
                </h1>

                <div className="d-flex flex-column align-items-center w-100">
                    {contacts.map((contact, index) => (
                        <div
                            key={contact.id}
                            style={{
                                display: "flex",
                                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                                width: "80%",
                                minHeight: "300px",
                                backgroundColor: "#1b1e1d",
                                borderRadius: "15px",
                                overflow: "hidden",
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                                marginBottom: "30px",
                            }}
                        >
                            <div
                                style={{
                                    flex: "1",
                                    backgroundImage: `url(${contact.imgSrc})`,
                                    backgroundSize: "contain", // Scale image to fit within container
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    minHeight: "300px",
                                }}
                            ></div>

                            <div
                                style={{
                                    flex: "1",
                                    padding: "30px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    color: "#e0e0e0",
                                }}
                            >
                                <h2
                                    style={{
                                        color: "#28a745",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {contact.name}
                                </h2>
                                <p style={{ marginBottom: "5px" }}>
                                    Phone: {contact.phone}
                                </p>
                                <p>Email: {contact.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
