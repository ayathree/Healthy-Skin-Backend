import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import z from "zod";
import { Gender } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";




const router = Router();




router.post("/create-doctor",

    //     (req: Request, res: Response, next: NextFunction) => {


    //     const parseResult = createDoctorZodSchema.safeParse(req.body);

    //     if (!parseResult.success) {
    //         next(parseResult.error)
    //     }
    //     req.body = parseResult.data


    //     next()

    // }, 

    validateRequest(createDoctorZodSchema),

    UserController.createdDoctor);

export const UserRoutes = router