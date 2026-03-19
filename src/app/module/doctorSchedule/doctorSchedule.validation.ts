import z from "zod";

const createMyDoctorScheduleValidation = z.object({
    doctorId: z.string().optional(),
    scheduleIds: z.array(z.string())
})

const updateMyDoctorScheduleValidation = z.object({
    scheduleIds: z.array(z.object({
        shouldDelete: z.boolean(),
        id: z.string()
    }))
})

export const doctorScheduleValidation = {
    createMyDoctorScheduleValidation,
    updateMyDoctorScheduleValidation
}