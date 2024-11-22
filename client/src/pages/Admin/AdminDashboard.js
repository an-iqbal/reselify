import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <style>{`
        .admin-dashboard {
          background-color: #f7f9fc;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .admin-card {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .admin-title {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 15px;
        }
        .admin-info {
          font-size: 1.2rem;
          color: #555;
          margin: 5px 0;
        }
        .admin-menu {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="container-fluid m-3 p-3 admin-dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin-card">
              <h3 className="admin-title">Admin Name: {auth?.user?.name}</h3>
              <h3 className="admin-info">Admin Email: {auth?.user?.email}</h3>
              <h3 className="admin-info">Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
