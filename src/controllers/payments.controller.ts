
import { Request, Response } from "express";

import { CashierRegisterModel } from "../models/cashierRegister.model";
import { PaymentModel } from "../models/payment";
import { Sales } from "../models/sales.model";


export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { payments } = req.body;
        const savedRegistration: any[] = [];

        for (const item of payments) {
            const { sale_id } = item;
            const sale: any = await Sales.findOne({ sale_id });

            // CREATE
            const newPay = new PaymentModel({
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
            payments: savedRegistration
        });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {

        const since = new Date(req.query.since);
        const payments = await PaymentModel.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ payments: payments });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};


