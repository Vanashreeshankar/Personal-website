import express from "express";
import { trackVisit } from "../controllers/visitController.js";

const router = express.Router();

router.get("/", trackVisit);

export default router;
