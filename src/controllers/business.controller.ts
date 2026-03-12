
import { Request, Response } from "express";
import { CustomError } from "../utils/custom_error.util";
import { validateBusinessInput } from "../validations/business.validations";
import { BusinessModel } from "../models/business.model";
import { Format_phone_number } from "../utils/simplefunctions.util";
import { MakeActivationCode } from "../utils/generate_activation.util";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

export const Create = async (req: Request | any, res: Response): Promise<void> => {
    try {

        await CustomError(validateBusinessInput, req.body, res)
        let phone = await Format_phone_number(req.body.phone_number); //format the phone number
        req.body.phone_number = phone;
        const Exists: any = await BusinessModel.findOne({ business_name: req.body.business_name });
        if (Exists) {
            res.status(400).json("business exists already Exists")
            return
        }

        req.body.createdBy = req.user.userId

        const newbusiness: any = new BusinessModel(req.body);
        let business = await newbusiness.save();
        const salt = await bcrypt.genSalt(10);

        req.body.password = await bcrypt.hash(req.body.phone_number, salt);
        req.body.phone_number = req.body.contact_number
        req.body.role = "admin"
        req.body.name = `${req.body.business_name}'s Admin`
        req.body.business = business._id
        req.body.activated = true
        const user: any = new User(req.body);
        const newUser = await user.save();
        res.status(201).json({ ok: true, message: "business added  successfully", newbusiness: business });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, message: "Server error", error });
        return;

    }
};

export const Get = async (req: Request | any, res: Response | any) => {

    try {
        let options: any = { deletedAt: null, }
        if (req.user.role === "superadmin") {
            options = { deletedAt: null, createdBy: req.user.userId }
        }
        const { page = 1, limit = 10, } = req.query;
        const products: any = await BusinessModel.find({ deletedAt: null, }).skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
        const total = await BusinessModel.countDocuments();
        res.status(201).json(
            {
                products, page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            }
        );
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, message: "Server error", error });
        return;

    }
};




export const Get_one = async (req: Request | any, res: Response | any) => {
    try {
        const business_obj: any = await BusinessModel.findById(req.user.business)
        res.status(201).json(business_obj);
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
        return;

    }
};

export const Update:any = async (req: Request | any, res: Response | any) => {
    try {
        let updates: any = await BusinessModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
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
        let deleted: any = await BusinessModel.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date.now() }, { new: true, useFindAndModify: false })
        res.status(200).json(`${deleted.business_name} deleted successfully`)
        return
    } catch (error) {
        res.status(404).json(error);

        return
        throw new Error("deletion Failed ")
    }
};



