import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
router.post("/create-doctor", UserController.createdDoctor);

export const UserRoutes = router