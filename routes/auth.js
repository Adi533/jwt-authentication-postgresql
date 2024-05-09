import express from "express";
import { register,login,logout } from "../controllers/auths.js";


const router = express.Router();

// registering the user
router.post("/register",register);

// logging in the user
router.post("/login",login);

// logging out the user
router.post("/logout",logout);


export default router;