import express from "express";

import {
  createTarget,
  getTarget,
  getTargets,
  updateTarget,
} from "../controllers/targets.js";

const router = express.Router();

router.route("/").get(getTargets).post(createTarget).put(updateTarget);
router.route("/:id").get(getTarget);

export default router;
