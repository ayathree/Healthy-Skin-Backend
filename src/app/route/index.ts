import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";


const router = Router();

router.use("/specialties", specialtyRoutes)
router.use("/auth", AuthRoutes)
router.use("/doctors", UserRoutes)

export const IndexRoutes = router