import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import dashRoutes from "./routes/dashboard.js";
import cookieParser from "cookie-parser";
import { client } from "./pg.cjs";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// importing routes
app.use('/api/auth',authRoutes);
app.use('/api',dashRoutes);

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});