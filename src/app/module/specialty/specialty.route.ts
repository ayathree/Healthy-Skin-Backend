import { NextFunction, Request, Response, Router } from "express";
import { specialtyController } from "./specialty.controller";
import { CookieUtils } from "../../utils/cookie";
import AppError from "../../errorHelper/appError";
import status from "http-status";
import { jwtUtils } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { checkAuth } from "../../middleware/checkAuthFile";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.createSpecialty);
router.get('/', specialtyController.getAllSpecialty);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), specialtyController.deleteSpecialty);

export const specialtyRoutes = router