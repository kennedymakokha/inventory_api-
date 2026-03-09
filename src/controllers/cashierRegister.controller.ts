
import { Request, Response } from "express";

import { CashierRegisterModel } from "../models/cashierRegister.model";
//  sale_id TEXT,
//               method TEXT,
//               amount REAL,
export const Bulk = async (req: Request | any, res: Response | any) => {
    try {
        const { registrations } = req.body;
        const savedRegistration: any[] = [];

        for (const item of registrations) {

            // CREATE
            const newRegistration = new CashierRegisterModel({
                ...item,
                business: req.user.business

            });
            const saved = await newRegistration.save();
            savedRegistration.push(saved);
            continue;
        }

        res.status(200).json({
            success: true,
            registrations: savedRegistration
        });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
export const UpdatedSince = async (req: Request | any, res: Response | any) => {
    try {

        const since = new Date(req.query.since);
        const registrations = await CashierRegisterModel.find({ updatedAt: { $gt: since }, business: req.user.business });

        res.status(200).json({ registrations: registrations });
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};


