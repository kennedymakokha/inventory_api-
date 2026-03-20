
import { Request, Response } from "express";
import { Sales } from "../models/sales.model";

export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { sales } = req.body;
        const savedsales: any[] = [];

        for (const item of sales) {
            console.log(item)
            // CREATE
            const newSale = new Sales({
                ...item,
                business: req.user.business

            });
            const saved = await newSale.save();
            savedsales.push(saved);
            continue;
        }

        res.status(200).json({
            success: true,
            sales: savedsales
        });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {

        const since = new Date(req.query.since);
        const sales = await Sales.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ sales: sales });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};


