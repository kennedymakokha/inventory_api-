
import { Request, Response } from "express";

import { Sales } from "../models/sales.model";
import { ProductModel } from "../models/product.model";
import { SaleItemModel } from "../models/saleItems";


export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { sales } = req.body;
        const savedRegistration: any[] = [];
      
        for (const item of sales) {

            const { product_id, sale_id } = item;
            const product: any = await ProductModel.findOne({ product_id });
            const sale: any = await Sales.findOne({ sale_id });
           
            // CREATE
            const newPay = new SaleItemModel({
                ...item,
                business: req.user.business,
                product: product._id,
                Sale: sale._id

            });
            const saved = await newPay.save();
            savedRegistration.push(saved);
            continue;
        }

        res.status(200).json({
            success: true,
            sales: savedRegistration
        });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {

        const since = new Date(req.query.since);
        const sales = await SaleItemModel.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ sales: sales });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};


