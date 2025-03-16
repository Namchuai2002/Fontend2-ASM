import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Danh sách danh mục");
});

// Xuất router theo ES module
export default router;
