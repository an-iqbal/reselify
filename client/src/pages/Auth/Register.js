import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [roll_no, setRollNo] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, roll_no, password, phone, address, answer }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title="Register - Resellify">
            <div className="register-container">
                <form onSubmit={handleSubmit} className="register-form">
                    <h4 className="form-title">Create Your Account</h4>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="InputName"
                            placeholder="Name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={roll_no}
                            onChange={(e) => setRollNo(e.target.value)}
                            className="form-control"
                            id="InputRollNo"
                            placeholder="Roll No"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="InputEmail"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="InputPhone"
                            placeholder="Phone"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="InputAddress"
                            placeholder="Address"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="InputPassword1"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="InputAnswer"
                            placeholder="Enter Your favorite Sport Name"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>

            <style jsx>{`
                /* Light gradient background */
                .register-container {
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
                .register-form {
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

                @media (max-width: 576px) {
                    .register-form {
                        width: 100%;
                        padding: 30px;
                    }
                }
            `}</style>
        </Layout>
    )
}

export default Register
