import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/all-users`);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching users.");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <style>{`
        .users-container {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .user-card {
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        .user-card:hover {
          transform: translateY(-5px);
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .card-text {
          color: #6c757d;
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="row users-container">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="title">All Users List</h1>
          <div className="row">
            {users?.map((user) => (
              <div key={user._id} className="col-md-4 mb-4">
                <div className="user-card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">Role: {user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserList;
