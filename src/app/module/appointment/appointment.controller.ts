import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { appointmentService } from "./appointment.service";



const bookAppointment = catchAsync((req: Request, res: Response) => {
    const schedule = appointmentService.bookAppointment();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'book appointment created successfully',
        data: schedule
    })
})

const getMyAppointments = catchAsync((req: Request, res: Response) => {
    const schedules = appointmentService.getMyAppointments();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All my appointments successfully',
        data: schedules
    })
})

const getMySingleAppointment = catchAsync((req: Request, res: Response) => {
    const schedules = appointmentService.getMySingleAppointment();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Single appointment successfully',
        data: schedules
    })
})

const getAllApointments = catchAsync((req: Request, res: Response) => {
    const schedule = appointmentService.getAllApointments();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All appointments successfully',
        data: schedule
    })
})

const changeAppointmentStatus = catchAsync((req: Request, res: Response) => {
    const schedule = appointmentService.changeAppointmentStatus();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Update appointment Status successfully',
        data: schedule
    })
})


export const appointmentController = {
    bookAppointment,
    getAllApointments,
    getMyAppointments,
    changeAppointmentStatus,
    getMySingleAppointment
}