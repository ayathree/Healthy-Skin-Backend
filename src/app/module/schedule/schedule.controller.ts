import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { scheduleService } from "./schedule.service";

const createSchedule = catchAsync((req: Request, res: Response) => {
    const schedule = scheduleService.createSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Schedule created successfully',
        data: schedule
    })
})

const getAllSchedule = catchAsync((req: Request, res: Response) => {
    const schedules = scheduleService.getAllSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule successfully',
        data: schedules
    })
})

const getScheduleById = catchAsync((req: Request, res: Response) => {
    const schedule = scheduleService.getScheduleById();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule by ID successfully',
        data: schedule
    })
})

const updateSchedule = catchAsync((req: Request, res: Response) => {
    const schedule = scheduleService.updateSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Update Schedule successfully',
        data: schedule
    })
})

const deleteSchedule = catchAsync((req: Request, res: Response) => {
    const schedule = scheduleService.deleteSchedule();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Delete Schedule successfully',
        data: schedule
    })
})

export const scheduleController = {
    createSchedule,
    getAllSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule
}