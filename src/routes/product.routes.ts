import { Router } from "express";
import { Bulk, Create, Get, GetUpdates, sync, Trash, Update, UpdatedSince } from "../controllers/product.controller";

const router = Router();



router.get("/", Get);
router.post("/", Create);
router.get("/updates", GetUpdates);
router.get("/updated-since", UpdatedSince);
router.post("/sync", sync);
router.post("/bulk", Bulk);
router.put("/:id", Update);
router.delete("/:id", Trash);
// router.get("/:id", Get_one);


export default router;
