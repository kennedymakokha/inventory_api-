
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";
import { validateProductInput } from "../validations/product.validations";

import { ProductModel } from "../models/product.model";
import { InventoryLog } from "../models/inventoryLog";



export const Get = async (req: Request | any, res: Response | any) => {

    try {
        let options: any = { deletedAt: null, }
        if (req.user.role == "admin") {
            options = { deletedAt: null, createdBy: req.user.userId }
        }
        const { page = 1, limit = 10, } = req.query;
        const products: any = await InventoryLog.find({ deletedAt: null, }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await InventoryLog.countDocuments();
        res.status(201).json(
            {
                products, page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            }
        );
        return; return
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, message: "Server error", error });
        return;

    }
};
export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { inventories } = req.body;
        const savedinventories: any[] = [];

        for (const item of inventories) {
            const { product_id } = item;

            const product: any = await ProductModel.findOne({ product_id });


            // CREATE
            const newInv = new InventoryLog({
                ...item,
                product: product._id,
                deleted_at: item.deleted_at ? new Date(item.deleted_at) : null
            });

            const saved = await newInv.save();
            savedinventories.push(saved);
            continue;


        }

        res.status(200).json({
            success: true,
            categories: savedinventories
        });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {
        const since = new Date(req.query.since);
        const inventories = await InventoryLog.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ inventories: inventories });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};






