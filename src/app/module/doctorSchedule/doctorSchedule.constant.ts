import { Prisma } from "../../../generated/prisma/client"

export const doctorScheduleSearchableFields = [
    'id',
    'doctorId',
    'scheduleId'
]

export const doctorScheduleFileterableFields = [
    'id',
    'doctorId',
    'scheduleId',
    'createAt',
    'updateAt',
    'isBooked',
    'schedule.startDateTime',
    'schedule.endDateTime'
]

export const doctorScheduleIncludingConfig: Partial<Record<keyof Prisma.DoctorSchedulesInclude, Prisma.DoctorSchedulesInclude[keyof Prisma.DoctorSchedulesInclude]>> = {
    doctor: {
        include: {
            user: true,
            appointments: true,
            specialties: true
        }
    },
    schedule: true
}