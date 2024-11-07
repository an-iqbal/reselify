import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css'; // Ensure you link the CSS file here

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <h4>About Us</h4>
                    <ul>
                        <li><Link to="/about">Our Story</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/faq">FAQs</Link></li>
                        <li><Link to="/returns">Returns & Exchanges</Link></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Policies</h4>
                    <ul>
                        <li><Link to="/policy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/shipping">Shipping Policy</Link></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Follow Us</h4>
                    <ul className="social-links">
                        <li><Link to="/facebook">Facebook</Link></li>
                        <li><Link to="/twitter">Twitter</Link></li>
                        <li><Link to="/instagram">Instagram</Link></li>
                        <li><Link to="/linkedin">LinkedIn</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="text-center">
                    &copy; {new Date().getFullYear()} Resify. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
