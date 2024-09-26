import express from "express";

import authRouter from "./auth.js";
import messageRouter from "./message.js";
import userRouter from "./user.js";

const rootRouter = express.Router();


rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/message", messageRouter);


export default rootRouter;