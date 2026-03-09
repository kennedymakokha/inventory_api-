
import { Request, Response } from "express";

import { CashierRegisterModel } from "../models/cashierRegister.model";
import { PaymentModel } from "../models/payment";
import { Sales } from "../models/sales.model";
import { ProductModel } from "../models/product.model";
import { RefundModel } from "../models/refunds";
import { RefundItemModel } from "../models/refundsItems";


export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { refunds } = req.body;
        const savedRegistration: any[] = [];

        for (const item of refunds) {
            const { product_id, refund_id } = item;
            const product: any = await ProductModel.findOne({ product_id });
            const refund: any = await RefundModel.findOne({ refund_id });
            // CREATE
            const newPay = new RefundItemModel({
                ...item,
                business: req.user.business,
                product: product._id,
                refund: refund._id

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
        const refunds = await RefundItemModel.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ refunds: refunds });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};


