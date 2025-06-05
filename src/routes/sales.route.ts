import { Router } from "express";
import { Create, fetchCumulativeProfit, Get, GetUpdates, sync, Trash, } from "../controllers/sales.controller";

const router = Router();



router.get("/", Get);
router.post("/", Create);
router.get("/updates", GetUpdates);
router.get("/cumulative-profit", fetchCumulativeProfit);
router.post("/sync", sync);
router.delete("/:id", Trash);
// router.get("/:id", Get_one);


export default router;
