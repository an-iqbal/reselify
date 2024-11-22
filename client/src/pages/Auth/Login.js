import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Login - Ecommer App">
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h4 className="form-title">Login to Your Account</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>

                    <div className="mb-3 text-end">
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => { navigate('/forgot-password'); }}
                            style={{ padding: '0', color: '#007bff', textDecoration: 'none' }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                        Login
                    </button>
                </form>
            </div>

            <style jsx>{`
                /* Light background gradient */
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 0 15px;
                    background: linear-gradient(to right, #f0f4f8, #e2efff);
                    background-size: 200% 200%;
                    animation: gradientAnimation 8s ease infinite;
                }

                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                /* Form Styling */
                .login-form {
                    background-color: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 450px;
                    margin: 0 auto;
                    transition: transform 0.3s ease-in-out;
                }

                .form-title {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .form-control {
                    font-size: 1rem;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    width: 100%;
                    margin-bottom: 15px;
                    transition: all 0.3s ease;
                }

                .form-control:focus {
                    border-color: #5fa3e7;
                    outline: none;
                }

                .btn-primary {
                    width: 100%;
                    padding: 12px;
                    font-size: 1.1rem;
                    border-radius: 8px;
                    background-color: #5fa3e7;
                    border: none;
                    color: white;
                    cursor: pointer;
                    transition: background-color 0.3s ease-in-out;
                }

                .btn-primary:hover {
                    background-color: #4a91d1;
                }

                .btn-link {
                    text-decoration: none;
                    font-size: 0.9rem;
                    color: #5fa3e7;
                }

                .btn-link:hover {
                    text-decoration: underline;
                }

                @media (max-width: 576px) {
                    .login-form {
                        width: 100%;
                        padding: 30px;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Login;
