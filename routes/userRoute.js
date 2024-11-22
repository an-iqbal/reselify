import express from "express";
import {
    getAllUsersController,
    getUserByIdController,
    deleteUserController
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

// Get single user by ID
router.get("/user/:id", requireSignIn, isAdmin, getUserByIdController);

// Delete a user
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

export default router;
