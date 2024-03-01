import express from "express";
const router = express.Router();
import movieRouter from './movie.router';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

router.use(cors({
    origin: process.env.AUTHORIZED_ORIGIN
}));

router.use('/movies', ((req, res, next) => {
    next();
}), movieRouter);

export default router;