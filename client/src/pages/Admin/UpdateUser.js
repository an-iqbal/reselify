import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [id, setId] = useState("");

    // Get single user
    const getSingleUser = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/users/user/${params.userId}`  // Updated API endpoint here
            );
            setName(data.user.name);
            setId(data.user._id);
            setEmail(data.user.email);
            setRole(data.user.role);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch user data");
        }
    };

    useEffect(() => {
        getSingleUser();
        // eslint-disable-next-line
    }, []);

    // Update user function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userData = new FormData();
            userData.append("name", name);
            userData.append("email", email);
            userData.append("role", role);
            profilePicture && userData.append("profilePicture", profilePicture);

            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/users/update-user/${id}`,  // Correct API endpoint for update
                userData
            );
            if (data?.success) {
                toast.success("User Updated Successfully");
                navigate("/dashboard/admin/users");
            } else {
                toast.error(data?.message || "Failed to update user");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Delete user
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this user?");
            if (!answer) return;
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/users/delete-user/${id}`  // Correct API endpoint for delete
            );
            toast.success("User Deleted Successfully");
            navigate("/dashboard/admin/users");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Update User"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update User</h1>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {profilePicture ? profilePicture.name : "Upload Profile Picture"}
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        accept="image/*"
                                        onChange={(e) => setProfilePicture(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {profilePicture ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(profilePicture)}
                                            alt="profile_picture"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/users/profile-picture/${id}`}
                                            alt="profile_picture"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={role}
                                    placeholder="Enter role"
                                    className="form-control"
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE USER
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    DELETE USER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateUser;
