import express from "express"
import { getMessages, sendMessage } from "../controllers/message.js";
import { authenticate } from "../middlewares/auth.js";
import catchMiddleware from "../middlewares/api.js";


const messageRouter = express.Router();


messageRouter.use(authenticate);
messageRouter.post("/:userId",catchMiddleware(sendMessage));
messageRouter.get("/:userId",catchMiddleware(getMessages));

export default messageRouter;