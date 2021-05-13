import express from "express";

const router = express.Router();

import todos from "./button-routes";
router.use("/button", todos);

export default router;
