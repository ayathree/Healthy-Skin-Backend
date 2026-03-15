import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import z from "zod";
import { Gender, Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuthFile";





const router = Router();




router.post("/create-doctor",

    checkAuth(Role.SUPER_ADMIN, Role.ADMIN), // Only super admin and admin can create doctor

    validateRequest(UserValidation.createDoctorZodSchema),

    UserController.createdDoctor);


router.post(
    "/create-admin",
    checkAuth(Role.SUPER_ADMIN), // Only super admin can create admin
    validateRequest(UserValidation.createAdminValidationSchema),
    UserController.createAdmin,
);




router.post(
    "/create-super-admin",
    checkAuth(Role.SUPER_ADMIN), // Only super admin can create super admin
    validateRequest(UserValidation.createSuperAdminValidationSchema),
    UserController.createSuperAdmin,
);

export const UserRoutes = router