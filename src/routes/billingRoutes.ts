import { Router } from "express";

import { getBillingOverview } from "../controllers/billingController";

const router = Router();



router.get("/", getBillingOverview);
// router.post("/", Create);
// router.get("/updates", GetUpdates);
// router.get("/updated-since", UpdatedSince);

// router.post("/bulk", Bulk);
// router.put("/:id", Update);
// router.delete("/:id", Trash);
// router.get("/:id", Get_one);


export default router;
