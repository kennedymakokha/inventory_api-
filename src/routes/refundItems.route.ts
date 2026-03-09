import { Router } from "express";
import { Bulk, UpdatedSince, } from "../controllers/refundItem.controller";

const router = Router();




router.post("/bulk", Bulk);
router.get("/updated-since", UpdatedSince);



export default router;
