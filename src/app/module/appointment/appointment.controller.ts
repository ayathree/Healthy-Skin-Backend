import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { appointmentService } from "./appointment.service";



const bookAppointment = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const appointment = await appointmentService.bookAppointment(payload, user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'book appointment created successfully',
        data: appointment
    })
})

const getMyAppointments = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const myAppointments = await appointmentService.getMyAppointments(user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All my appointments successfully',
        data: myAppointments
    })
})

const getMySingleAppointment = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const appointmentId = req.params.id;
    const singleAppointment = await appointmentService.getMySingleAppointment(appointmentId as string, user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All Single appointment successfully',
        data: singleAppointment
    })
})

const getAllApointments = catchAsync(async (req: Request, res: Response) => {
    const allAppointments = await appointmentService.getAllApointments();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Get All appointments successfully',
        data: allAppointments
    })
})

const changeAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const appointmentStatus = req.body.status;
    const updatedAppointment = await appointmentService.changeAppointmentStatus(appointmentId as string, appointmentStatus, req.user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Update appointment Status successfully',
        data: updatedAppointment
    })
})

const bookAppointmentWithPayLater = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const appointment = await appointmentService.bookAppointmentWithPayLater(payload, user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Appointment booked successfully with pay later option',
        data: appointment
    })
});

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const paymentInfo = await appointmentService.initiatePayment(appointmentId as string, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Payment initiated successfully',
        data: paymentInfo
    })
})


export const appointmentController = {
    bookAppointment,
    getAllApointments,
    getMyAppointments,
    changeAppointmentStatus,
    getMySingleAppointment,
    bookAppointmentWithPayLater,
    initiatePayment
}