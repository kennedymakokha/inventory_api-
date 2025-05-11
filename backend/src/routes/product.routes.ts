import { Router } from "express";
import { Create, Get, GetUpdates, sync, Trash, Update } from "../controllers/product.controller";

const router = Router();



router.get("/", Get);
router.post("/", Create);
router.get("/updates", GetUpdates);
router.post("/sync", sync);
router.put("/:id", Update);
router.delete("/:id", Trash);
// router.get("/:id", Get_one);


export default router;
