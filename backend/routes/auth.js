import express from "express";
import { login, logout, signup } from "../controllers/auth.js";
import catchMiddleware from "../middlewares/api.js";


const authRouter = express.Router();


authRouter.post("/signup", catchMiddleware(signup));
authRouter.post("/login", catchMiddleware(login));
authRouter.post("/logout", catchMiddleware(logout));

export default authRouter;
