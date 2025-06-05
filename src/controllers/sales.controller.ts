
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";

import { validateInventoryInput } from "../validations/inventory.validations";
import { Sales } from "../models/sales.model";
import { ProductModel } from "../models/product.model";

export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {
        // CustomError(validateInventoryInput, req.body, res)


        const Exists: any = await ProductModel.findOne({ _id: req.body.product_id });
        let qty = req.body.quantity
        req.body.createdBy = req.user.userId
        const newStock: any = new Sales(req.body);
        await newStock.save();

        qty = parseInt(Exists.quantity) - parseInt(req.body.quantity)
        let updates: any = await ProductModel.findOneAndUpdate({ _id: req.body.product_id }, { quantity: qty }, { new: true, useFindAndModify: false })

        res.status(201).json({ ok: true, message: "admin added  successfully", updates });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, message: "Server error", error });
        return;

    }
};
export const sync = async (req: Request | any, res: Response): Promise<void> => {
    try {
        console.log("B$", req.body)
        const { product_id, quantity, updatedAt } = req.body;
        const existing: any = await ProductModel.findOne({ _id: product_id });
        let curStock = parseFloat(existing.quantity ? existing.quantity : "0") + parseFloat(quantity)
        console.log("B$", req.body)
        let D = await Sales.create(req.body);
        console.log(D)
        let sale = await ProductModel.findOneAndUpdate({ _id: product_id }, { quantity: curStock }, { new: true, useFindAndModify: false })
        res.status(200).send({ success: true, sale });
        return
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Sync failed' });
        return
    }
};
export const Get = async (req: Request | any, res: Response | any) => {

    try {
        let options: any = { deletedAt: null, }
        if (req.user.role == "admin") {
            options = { deletedAt: null, createdBy: req.user.userId }
        }
        const { page = 1, limit = 10, } = req.query;
        const products: any = await Sales.find({ deletedAt: null, }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate({ path: "product_id", select: "product_name Bprice quantity" })
            .sort({ createdAt: -1 })
        const total = await Sales.countDocuments();
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

export const GetUpdates = async (req: Request | any, res: Response | any) => {
    const { since } = req.query;
    try {
        const updated = await Sales.find({
            updatedAt: { $gt: new Date(since as string) },
            createdBy: req.user.userId
        });
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fetch failed' });
    }
};

export const Get_one = async (req: Request | any, res: Response | any) => {
    try {
        const { id } = req.query;

        const product_obj: any = await Sales.findById(id)
        res.status(201).json(product_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};

export const Trash = async (req: Request | any, res: Response | any) => {
    try {
        let deleted: any = await Sales.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.product_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};



// export async function fetchCumulativeProfit(timeframe: string) {
export const fetchCumulativeProfit = async (req: Request | any, res: Response | any) => {
    const { timeframe } = req.query;
    const now = new Date();
    let match: any = {};

    switch (timeframe) {
        case 'today':
            match.created_at = {
                $gte: new Date(now.toDateString()),
                $lt: new Date(new Date(now.toDateString()).getTime() + 86400000),
            };
            break;

        case 'last-week':
            match.created_at = {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                $lt: now,
            };
            break;

        case 'last-month':
            match.created_at = {
                $gte: new Date(new Date().setMonth(now.getMonth() - 1)),
                $lt: now,
            };
            break;

        case 'last-3months':
            match.created_at = {
                $gte: new Date(new Date().setMonth(now.getMonth() - 3)),
                $lt: now,
            };
            break;

        case 'monthly':
            match.created_at = {
                $gte: new Date(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`),
                $lt: new Date(`${now.getFullYear()}-${String(now.getMonth() + 2).padStart(2, '0')}-01`),
            };
            break;

        case 'yearly':
            match.created_at = {
                $gte: new Date(`${now.getFullYear()}-01-01`),
                $lt: new Date(`${now.getFullYear() + 1}-01-01`),
            };
            break;

        case 'all':
            // no match filter
            break;

        default:
            throw new Error('Invalid timeframe');
    }

    const pipeline: any[] = [];

    if (timeframe !== 'all') {
        pipeline.push({ $match: match });
    }

    pipeline.push(
        {
            $lookup: {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'product',
            },
        },
        { $unwind: '$product' },
        {
            $group: {
                _id: null,
                total_sales_revenue: { $sum: { $multiply: ['$soldprice', '$quantity'] } },
                total_profit: {
                    $sum: {
                        $multiply: [
                            { $subtract: ['$soldprice', '$product.Bprice'] },
                            '$quantity',
                        ],
                    },
                },
                expected_profit: {
                    $sum: {
                        $multiply: [
                            { $subtract: ['$product.price', '$product.Bprice'] },
                            '$quantity',
                        ],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                total_sales_revenue: 1,
                total_profit: 1,
                expected_profit: 1,
            },
        }
    );

    const result = await Sales.aggregate(pipeline);
    console.log(result);
    console.log(result[0])
    // { total_sales_revenue: 0, total_profit: 0, expected_profit: 0
    res.status(200).json(` deleted successfully`)
    return;
}



