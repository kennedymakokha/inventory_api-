import { Router } from "express";
import { Create, Get, GetUpdates, sync, Trash, } from "../controllers/sales.controller";

const router = Router();



router.get("/", Get);
router.post("/", Create);
router.get("/updates", GetUpdates);
router.post("/sync", sync);
router.delete("/:id", Trash);
// router.get("/:id", Get_one);


export default router;
