import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";


const getDoctors = catchAsync(
    async (req: Request, res: Response) => {
        const result = await DoctorService.getAllDoctors();
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor fetched successfully",
            data: result
        })
    }
)

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await DoctorService.getDoctorById(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor retrieved successfully",
        data: result,
    });
});


const updateDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await DoctorService.updateDoctor(id as string, req.body);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor updated successfully",
        data: result,
    });
});


const softDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await DoctorService.softDeleteDoctor(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor deleted successfully",
        data: result,
    });
});
export const DoctorController = {
    getDoctors,
    getDoctorById,
    updateDoctor,
    softDeleteDoctor,
}