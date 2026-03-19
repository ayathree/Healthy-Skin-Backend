import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuthFile";
import { Role } from "../../../generated/prisma/enums";
import { scheduleController } from "./schedule.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { scheduleValidation } from "./schedule.validation";

const route = Router()
route.post('/', checkAuth(Role.SUPER_ADMIN, Role.ADMIN), validateRequest(scheduleValidation.createScheduleZodSchema), scheduleController.createSchedule);
route.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR), scheduleController.getAllSchedule);
route.get('/:id', checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR), scheduleController.getScheduleById);
route.patch('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(scheduleValidation.updateScheduleZodSchema), scheduleController.updateSchedule);
route.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), scheduleController.deleteSchedule);

export const scheduleRoutes = route