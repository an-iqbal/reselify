import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div
            style={{
                backgroundColor: '#131914', // Dark background similar to About Us
                color: '#e0e0e0', // Light grey text color for contrast
                padding: '30px 0',
                textAlign: 'center',
                marginTop: 'auto', // Pushes footer to bottom of the page if there's space
            }}
        >
            <h4
                style={{
                    fontSize: '1.5em',
                    color: '#28a745', // Green accent color
                    marginBottom: '15px',
                }}
            >
                All Rights Reserved &copy; Reselify
            </h4>
            <p
                style={{
                    fontSize: '1.1em',
                    marginTop: '10px',
                    marginBottom: '20px',
                }}
            >
                <Link
                    to="/about"
                    style={{
                        color: '#28a745',
                        textDecoration: 'none',
                        margin: '0 10px',
                    }}
                >
                    About
                </Link>|
                <Link
                    to="/contact"
                    style={{
                        color: '#28a745',
                        textDecoration: 'none',
                        margin: '0 10px',
                    }}
                >
                    Contact
                </Link>|
                <Link
                    to="/policy"
                    style={{
                        color: '#28a745',
                        textDecoration: 'none',
                        margin: '0 10px',
                    }}
                >
                    Privacy Policy
                </Link>
            </p>
            <p
                style={{
                    fontSize: '0.9em',
                    color: '#aaa', // Slightly muted grey for small text
                }}
            >
                Crafted with care by the Reselify team.
            </p>
        </div>
    );
};

export default Footer;
