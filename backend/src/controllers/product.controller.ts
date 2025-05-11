
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";
import { validateProductInput } from "../validations/product.validations";
import { ProductModel } from "../models/product.model";


export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {

        await CustomError(validateProductInput, req.body, res)
        const Exists: any = await ProductModel.findOne({ business: req.body.business, product_name: req.body.product_name });
        if (Exists) {
            res.status(400).json("product exists already Exists")
            return
        }

        req.body.createdBy = req.user.userId

        const newproduct: any = new ProductModel(req.body);
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
        console.log(req.body)
        const { product_name, price, updatedAt, createdBy } = req.body;
        const existing = await ProductModel.findOne({ product_name, createdBy: req.user.userId });

        if (existing) {
            // Update only if newer
            if (new Date(updatedAt) > new Date(existing.updatedAt)) {
                existing.price = price;
                existing.updatedAt = updatedAt;
                await existing.save();
            }
        } else {
            let v = await ProductModel.create({ product_name, price, updatedAt, createdBy });

        }

        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: true, error: 'Sync failed' });
    }
};
export const Get = async (req: Request | any, res: Response | any) => {

    try {
        let options: any = { deletedAt: null, }
        if (req.user.role == "admin") {
            options = { deletedAt: null, createdBy: req.user.userId }
        }
        const { page = 1, limit = 10, } = req.query;
        const products: any = await ProductModel.find({ deletedAt: null, }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await ProductModel.countDocuments();
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
    console.log('since:', since);

    const sinceDate = new Date(since as string);

    if (!since || isNaN(sinceDate.getTime())) {
        return res.status(400).json({ error: 'Invalid or missing "since" query parameter' });
    }

    try {
        const updated = await ProductModel.find({
            createdBy: req.user.userId,
            updatedAt: { $gt: sinceDate }
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

        const product_obj: any = await ProductModel.findById(id)
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
        let updates: any = await ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
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
        let deleted: any = await ProductModel.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.product_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};



