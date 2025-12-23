import {
  getNextId,
  writeTargets,
  readTargets,
} from "../utils/targetsStorage.js";
import path from "path";
const __dirname = path.resolve();
const TODOS_PATH =
  process.env.TODOS_PATH || path.join(__dirname, "data", "targets.json");

export const getTargets = async (req, res) => {
  try {
    const { region, status, minPriority } = req.query;
    const targets = await readTargets(TODOS_PATH);
    let target;
    if (region || status || minPriority) {
      target = targets.filter(
        (t) =>
          t.region === region ||
          t.status === status ||
          t.priority >= minPriority
      );
    }
    if (!target) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: target });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const getTarget = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const targets = await readTargets(TODOS_PATH);
    const target = targets.find((t) => t.id === intId);
    if (!target) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: target });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

export const createTarget = async (req, res) => {
  try {
    const targets = await readTargets(TODOS_PATH);

    if (req.headers["content-type"] !== "application/json")
      throw new Error("Content type error.");

    const newTarget = {
      id: getNextId(targets),
      codeName: req.body.codeName || "default target",
      region: req.body.region || "",
      priority: req.body.priority || 1,
      status: "new",
      createdAt: new Date(),
    };
    targets.push(newTarget);
    await writeTargets(targets, TODOS_PATH);
    res.status(201).json({ msg: "success", data: newTarget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

export const updateTarget = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const targets = await readTargets(TODOS_PATH);
    const target = targets.find((t) => t.id === intId);

    if (!target) {
      res.status(404).json({ success: false, data: {} });
    } else {
      target.codeName = body.codeName || target.codeName;
      target.region = body.region || target.region;
      target.priority = body.priority || target.priority;
      target.status = body.status || target.status;
      await writeTargets(targets, TODOS_PATH);
      res.status(201).json({ success: true, data: target });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};
