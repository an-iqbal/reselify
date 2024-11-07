import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll_no, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name, email, roll_no, password, phone, address, answer
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Register - Reselify">
      <div className="form-container">
        <h4 className="title">Register</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
          <input type="text" value={roll_no} onChange={(e) => setRollNo(e.target.value)} placeholder='Roll No' required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' required />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Enter Your Favorite Sport' required />
          <button type="submit">Register</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
