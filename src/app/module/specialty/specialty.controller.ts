import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";









const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {

        const payload = {
            ...req.body,
            icon: req.file?.path
        };
        const result = await specialtyService.createSpecialty(payload)

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: 'Specialty created successfully',
            data: result
        })



    }
)


const getAllSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const specialties = await specialtyService.getAllSpecialty();

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Get Specialty successfully',
            data: specialties
        })
    }


)

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const result = await specialtyService.deleteSpecialty(id as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'delete Specialty successfully',
            data: result
        })



    }
)

export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}