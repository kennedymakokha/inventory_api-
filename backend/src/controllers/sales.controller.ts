
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";

import { validateInventoryInput } from "../validations/inventory.validations";
import { Sales } from "../models/sales.model";
import { ProductModel } from "../models/product.model";

export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {
        CustomError(validateInventoryInput, req.body, res)


        const Exists: any = await Sales.findOne({ _id: req.body.product });
        let qty = req.body.quantity
        req.body.createdBy = req.user.userId
        const newStock: any = new Sales(req.body);
        await newStock.save();
        if (Exists) {
            qty = parseInt(Exists.quantity) + parseInt(req.body.quantity)
            let updates: any = await Sales.findOneAndUpdate({ _id: req.body.product }, { quantity: qty }, { new: true, useFindAndModify: false })
            res.status(200).json(updates._id)
            return
        }
        const newproduct: any = new Sales(req.body);
        await newproduct.save();
        res.status(201).json({ ok: true, message: "admin added  successfully", newproduct });
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

