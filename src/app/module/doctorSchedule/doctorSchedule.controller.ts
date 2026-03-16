import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { doctorScheduleService } from "./doctorSchedule.service";


const createMyDoctorSchedule = catchAsync((req: Request, res: Response) => {
    const schedule = doctorScheduleService.createMyDoctorSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Doctor Schedule created successfully',
        data: schedule
    })
})

const getAllSchedules = catchAsync((req: Request, res: Response) => {
    const schedules = doctorScheduleService.getAllSchedules();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule successfully',
        data: schedules
    })
})

const getMyDoctorSchedules = catchAsync((req: Request, res: Response) => {
    const schedules = doctorScheduleService.getMyDoctorSchedules();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule successfully',
        data: schedules
    })
})

const getDoctorScheduleById = catchAsync((req: Request, res: Response) => {
    const schedule = doctorScheduleService.getDoctorScheduleById();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule by ID successfully',
        data: schedule
    })
})

const updateMyDoctorSchedule = catchAsync((req: Request, res: Response) => {
    const schedule = doctorScheduleService.updateMyDoctorSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Update Schedule successfully',
        data: schedule
    })
})

const deleteMyDoctorSchedule = catchAsync((req: Request, res: Response) => {
    const schedule = doctorScheduleService.deleteMyDoctorSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Delete Schedule successfully',
        data: schedule
    })
})

export const doctorScheduleController = {
    createMyDoctorSchedule,
    getAllSchedules,
    getMyDoctorSchedules,
    getDoctorScheduleById,
    updateMyDoctorSchedule,
    deleteMyDoctorSchedule
}