import userModel from "../models/userModel.js";

// Controller to fetch all users
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password"); // Exclude sensitive fields
        res.status(200).send({
            success: true,
            message: "All Users Fetched Successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({
            success: false,
            message: "Error fetching users",
            error: error.message,
        });
    }
};

// Controller to fetch a single user by ID
export const getUserByIdController = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user,
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).send({
            success: false,
            message: "Error fetching user",
            error: error.message,
        });
    }
};

// Controller to delete a user by ID
export const deleteUserController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({
            success: false,
            message: "Error deleting user",
            error: error.message,
        });
    }
};
