import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuthFile";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";

const route = Router();
route.get("/", checkAuth(Role.SUPER_ADMIN), adminController.getAllAdmins)
route.get(
    "/:id",
    checkAuth(Role.SUPER_ADMIN),
    adminController.getAdminById,
);

route.patch(
    "/:id",
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
    validateRequest(AdminValidation.updateAdminValidationSchema),
    adminController.updateAdmin,
);

route.delete(
    "/:id",
    checkAuth(Role.SUPER_ADMIN),
    adminController.softDeleteAdmin,
);

export const AdminRoutes = route