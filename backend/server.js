import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path"
import rootRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import { app, server } from "./socket/socket.js";



dotenv.config();
const PORT = process.env.PORT || 8000


const __dirname = path.resolve();

app.use(express.json()) //to parse req.body
app.use(express.urlencoded({ extended: true })) //to parse form data(urlencoded)
app.use(cookieParser())
app.use("/api", rootRouter);
//error handler
app.use((err, req, res, next) => {
    logger.error(err);
    if (err.isOperational) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('✅ Connected to DB');
        server.listen(PORT, () => {
            logger.info(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error(err.message)
    });