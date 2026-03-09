
import { Request, Response } from "express";

import { CashierRegisterModel } from "../models/cashierRegister.model";

import { Sales } from "../models/sales.model";
import { RefundModel } from "../models/refunds";


export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { refunds } = req.body;
        const savedRegistration: any[] = [];

        for (const item of refunds) {
            const { sale_id } = item;
            const sale: any = await Sales.findOne({ sale_id });

            // CREATE
            const newPay = new RefundModel({
                ...item,
                business: req.user.business,
                sale: sale._id

            });
            const saved = await newPay.save();
            savedRegistration.push(saved);
            continue;
        }

        res.status(200).json({
            success: true,
            refunds: savedRegistration
        });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {

        const since = new Date(req.query.since);
        const refunds = await RefundModel.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ refunds: refunds });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};


