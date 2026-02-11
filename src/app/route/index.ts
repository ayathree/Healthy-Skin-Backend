import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";


const router = Router();

router.use("/specialties", specialtyRoutes)
router.use("/auth", AuthRoutes)

export const IndexRoutes = router