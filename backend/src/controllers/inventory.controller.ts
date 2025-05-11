
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";
import { validateProductInput } from "../validations/product.validations";
import { Inventory } from "../models/inventory.model";
import { validateInventoryInput } from "../validations/inventory.validations";

export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {
        CustomError(validateInventoryInput, req.body, res)

        console.log(req.body)
        const Exists: any = await Inventory.findOne({ _id: req.body.product });
        let qty = req.body.quantity
        req.body.createdBy = req.user.userId
        const newStock: any = new Inventory(req.body);
        await newStock.save();
        if (Exists) {
            qty = parseInt(Exists.quantity) + parseInt(req.body.quantity)
            let updates: any = await Inventory.findOneAndUpdate({ _id: req.body.product }, { quantity: qty }, { new: true, useFindAndModify: false })
            res.status(200).json(updates._id)
            return
        }
        const newproduct: any = new Inventory(req.body);
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
        const { product_id, quantity, updatedAt } = req.body;
        const existing = await Inventory.findOne({ product_id, createdBy: req.user.userId });

        if (existing) {
            // Update only if newer
            if (new Date(updatedAt) > new Date(existing.updatedAt)) {
                existing.quantity = quantity;
                existing.updatedAt = updatedAt;
                await existing.save();
            }
        } else {
            await Inventory.create(req.body);
        }

        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Sync failed' });
    }
};
export const Get = async (req: Request | any, res: Response | any) => {

    try {
        let options: any = { deletedAt: null, }
        if (req.user.role == "admin") {
            options = { deletedAt: null, createdBy: req.user.userId }
        }
        const { page = 1, limit = 10, } = req.query;
        const products: any = await Inventory.find({ deletedAt: null, }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await Inventory.countDocuments();
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
    console.log(since)
    try {
        const updated = await Inventory.find({
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

        const product_obj: any = await Inventory.findById(id)
        res.status(201).json(product_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};

export const Update = async (req: Request | any, res: Response | any) => {
    try {
        let updates: any = await Inventory.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json(updates._id)
        return
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        return
    }
};
export const Trash = async (req: Request | any, res: Response | any) => {
    try {
        let deleted: any = await Inventory.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.product_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};

