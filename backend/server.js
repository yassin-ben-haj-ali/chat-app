import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rootRouter from "./routes";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000


app.use(express.json()) //to parse req.body
app.use(express.urlencoded({ extended: true })) //to parse form data(urlencoded)
app.use(cookieParser())
app.get("/api", rootRouter);
//error handler
app.use((err, req, res, next) => {
    logger.error(err);
    if (err.isOperational) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('✅ Connected to DB');
        app.listen(PORT, () => {
            logger.info(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error(err.message);
    });