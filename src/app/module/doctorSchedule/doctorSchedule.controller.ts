import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { doctorScheduleService } from "./doctorSchedule.service";
import { IQueryParams } from "../../interfaces/query.interface";


const createMyDoctorSchedule = catchAsync((req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const schedule = doctorScheduleService.createMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Doctor Schedule created successfully',
        data: schedule
    })
})

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await doctorScheduleService.getAllSchedules(query as IQueryParams);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule successfully',
        data: result.data,
        meta: result.meta
    })
})

const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const query = req.query;
    const result = await doctorScheduleService.getMyDoctorSchedules(user, query as IQueryParams);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule successfully',
        data: result.data,
        meta: result.meta
    })
})

const getDoctorScheduleById = catchAsync((req: Request, res: Response) => {
    const { doctorId, scheduleId } = req.params;
    const schedule = doctorScheduleService.getDoctorScheduleById(doctorId as string, scheduleId as string);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Schedule by ID successfully',
        data: schedule
    })
})

const updateMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body;
    const user = req.user;
    const updateDoctorSchedule = await doctorScheduleService.updateMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Update Schedule successfully',
        data: updateDoctorSchedule
    })
})

const deleteMyDoctorSchedule = catchAsync((req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const schedule = doctorScheduleService.deleteMyDoctorSchedule(id as string, user);
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