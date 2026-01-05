import express from "express";
import { 
    adminLogin, 
    getAllBlogsAdmin, 
    getAllComments, 
    deleteCommentById, 
    approveCommentById, 
    getDashboard 
} from "../controllers/adminControllers.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// Public Route
adminRouter.post("/login", adminLogin);

// Protected Routes (Require Auth Token)
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.get("/comments", auth, getAllComments);

// Action Routes
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);

export default adminRouter;