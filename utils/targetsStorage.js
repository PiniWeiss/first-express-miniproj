import fs from "fs/promises";

// ==================== UTILITY FUNCTIONS ====================

export const getNextId = (targets) => {
  if (!targets ||targets.length === 0) {
    return 1;
  }
  let maxValue = 0;
 targets.forEach((target) => {
    if (target.id > maxValue) {
      maxValue = target.id;
    }
  });
  return maxValue + 1;
};

async function fileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Readtargets from JSON file
 * @returns {Array} Array of target objects
 */
export const readTargets = async (path) => {
  if (!(await fileExists(path))) {
    return [];
  }
  try {
    const data = await fs.readFile(path, "utf8");
    
    return JSON.parse(data);
  } catch (error) {
    // If file is corrupted or empty, return empty array
    return [];
  }
};





/**
 * Writetargets to JSON file
 * @param {Array}targets - Array of target objects
 */
export const writeTargets = async (tartargets, path) => {
  await fs.writeFile(path, JSON.stringify(tartargets, null, 2), "utf8");
};