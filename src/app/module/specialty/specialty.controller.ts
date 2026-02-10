import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";

const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {

        const payload = req.body;
        const result = await specialtyService.createSpecialty(payload)

        res.status(201).json({
            success: true,
            message: 'Specialty created successfully',
            data: result
        })

    }
)


const getAllSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const specialties = await specialtyService.getAllSpecialty();

        res.status(200).json({
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
        res.status(200).json({
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