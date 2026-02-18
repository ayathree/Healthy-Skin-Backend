import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const route = Router();
route.get("/", DoctorController.getDoctors)

export const DoctorRoutes = route