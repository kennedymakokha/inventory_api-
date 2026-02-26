
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";
import { validateProductInput } from "../validations/product.validations";
import { categoryModel } from "../models/category.model";


export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {

        await CustomError(validateProductInput, req.body, res)
        const Exists: any = await categoryModel.findOne({ business: req.body.business, category_name: req.body.category_name });
        if (Exists) {
            res.status(400).json("category exists already Exists")
            return
        }

        req.body.createdBy = req.user.userId

        const newproduct: any = new categoryModel(req.body);
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

        const { category_name, price, updatedAt, createdBy } = req.body;
        const existing = await categoryModel.findOne({ category_name, createdBy: req.user.userId });

        if (existing) {
            // Update only if newer
            if (new Date(updatedAt) > new Date(existing.updatedAt)) {
              
                existing.updatedAt = updatedAt;
                await existing.save();
            }
        } else {
            let v = await categoryModel.create({ category_name, updatedAt, createdBy });
        }

        res.status(200).send({ success: true });
        return
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
        const products: any = await categoryModel.find({ deletedAt: null, }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await categoryModel.countDocuments();
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
        const { categories } = req.body;
        const savedcategories = [];

        for (let item of categories) {
            const { category_id } = item;
            console.log("G", category_id)
            const exists = await categoryModel.findById(category_id);
            console.log("GES", exists)
            if (exists) continue;
            const newProduct = new categoryModel({
                ...item,
                synced: true,
                created_at: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt)
            });
            const saved = await newProduct.save();
            savedcategories.push(saved);
        }

        res.status(200).json({ success: true, synced: savedcategories });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }

};

export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {

        const since = new Date(req.query.since);
        const updated = await categoryModel.find({ updatedAt: { $gt: since } });

        res.status(200).json(updated);
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

export const GetUpdates = async (req: Request | any, res: Response | any) => {
    const { since } = req.query;
    const sinceDate = new Date(since as string);
    if (!since || isNaN(sinceDate.getTime())) {
        return res.status(400).json({ error: 'Invalid or missing "since" query parameter' });
    }

    try {
        const updated = await categoryModel.find({
            createdBy: req.user.userId,
            updatedAt: { $gt: sinceDate }
        });
        res.status(200).json(updated);
        return
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fetch failed' });
    }
};


export const Get_one = async (req: Request | any, res: Response | any) => {
    try {
        const { id } = req.query;

        const category_obj: any = await categoryModel.findById(id)
        res.status(201).json(category_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};

export const Update = async (req: Request | any, res: Response | any) => {
    try {
        let updates: any = await categoryModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
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
        let deleted: any = await categoryModel.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.category_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};



