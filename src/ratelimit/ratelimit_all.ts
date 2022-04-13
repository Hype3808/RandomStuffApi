import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

import auth from "../models/auth";

const minute_rateLimiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute,
    max: async function (req: Request, res: Response) {
        const auth2 = await auth.findOne({ key: req.headers.Authorization || "" });
        const plan = auth2.plan;

        if (plan == "free") {
            return 60;
        }

        if (plan == "pro") {
            return 100;
        }

        if (plan == "pro+") {
            return 200;
        }

        if (plan == "ultimate") {
            return Infinity;
        }

        else return 10


    },
    message: {
        message: "You have exceeded your rate limit for this endpoint. Please purchase a premium plan to enjoy increased rate limit or wait for your current rate limit to expire.",
    },
    standardHeaders: true

})

const daily_rateLimiter = rateLimit({
    windowMs: 1000 * 60 * 60 * 24, // 1 day
    max: async function (req: Request, res: Response) {
        const auth2 = await auth.findOne({ key: req.headers.Authorization || "" });
        const plan = auth2.plan;

        if (plan == "free") {
            return 1000
        }

        if (plan == "pro") {
            return 3000
        }

        if (plan == "pro+") {
            return 5000
        }

        if (plan == "ultimate") {
            return 10000
        }

        else return 10

    },
    message: {
        message: "You have exceeded your rate limit for this endpoint. Please purchase a premium plan to enjoy increased rate limit or wait for your current rate limit to expire.",
    },
    standardHeaders: true
})
export {
    minute_rateLimiter,
    daily_rateLimiter
}