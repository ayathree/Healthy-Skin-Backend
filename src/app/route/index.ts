import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
import { AdminRoutes } from "../module/admin/admin.route";
import { scheduleRoutes } from "../module/schedule/schedule.route";
import { doctorScheduleRoutes } from "../module/doctorSchedule/doctorSchedule.route";
import { appointmentRoutes } from "../module/appointment/appointment.route";


const router = Router();

router.use("/specialties", specialtyRoutes)
router.use("/auth", AuthRoutes)
router.use("/users", UserRoutes)
router.use("/doctors", DoctorRoutes)
router.use("/admins", AdminRoutes)
router.use("/schedules", scheduleRoutes)
router.use("/doctor-schedules", doctorScheduleRoutes)
router.use('/appointments', appointmentRoutes)

export const IndexRoutes = router