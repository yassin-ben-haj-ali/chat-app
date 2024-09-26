import express from "express";
import { getUsers } from "../controllers/user.js";
import { authenticate } from "../middlewares/auth.js";
import catchMiddleware from "../middlewares/api.js";


const userRouter = express.Router();

userRouter.use(authenticate);
userRouter.get("/", catchMiddleware(getUsers));


export default userRouter