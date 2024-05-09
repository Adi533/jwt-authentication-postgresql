import express from "express";
import { getallusers } from "../controllers/dashboards.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

// dashboard
router.get("/dash",verifyToken,getallusers);



export default router;