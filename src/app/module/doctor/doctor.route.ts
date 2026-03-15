import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuthFile";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { DoctorValidation } from "./doctor.validation";

const route = Router();
route.get("/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    DoctorController.getDoctors)
route.get(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    DoctorController.getDoctorById,
);
route.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    validateRequest(DoctorValidation.updateDoctorValidationSchema),
    DoctorController.updateDoctor,
);

route.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    DoctorController.softDeleteDoctor,
);
export const DoctorRoutes = route