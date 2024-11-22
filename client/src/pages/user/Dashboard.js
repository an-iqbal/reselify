import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Card } from "react-bootstrap";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Reselify App"}>
    <div className="container-fluid m-4 p-4">
      <div className="row">
        {/* User Menu Sidebar */}
        <div className="col-md-3 mb-4">
          <UserMenu />
        </div>

        {/* User Dashboard Details */}
        <div className="col-md-9">
          <Card className="shadow-sm border-0 rounded p-4">
            <Card.Header className="bg-primary text-white text-center">
              <h2>Welcome, {auth?.user?.name}!</h2>
            </Card.Header>
            <Card.Body>
              <div className="user-details">
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="text-primary me-2" />
                  <h5 className="mb-0">Name: {auth?.user?.name}</h5>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="text-primary me-2" />
                  <h5 className="mb-0">Email: {auth?.user?.email}</h5>
                </div>
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="text-primary me-2" />
                  <h5 className="mb-0">Address: {auth?.user?.address || "Not provided"}</h5>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted text-center">
              Thank you for being a part of Reselify!
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Dashboard;