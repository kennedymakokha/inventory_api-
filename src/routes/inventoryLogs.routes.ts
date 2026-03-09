import { Router } from "express";
import { Bulk, UpdatedSince } from "../controllers/inventoryLog.controller";

const router = Router();


// router.get("/updates", GetUpdates);
router.get("/updated-since", UpdatedSince)
router.post("/bulk", Bulk);




export default router;
