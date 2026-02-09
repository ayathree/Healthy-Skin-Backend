import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const result = await specialtyService.createSpecialty(payload)

        res.status(201).json({
            success: true,
            message: 'Specialty created successfully',
            data: result
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to create specialty",
            error: error.message
        })
    }
}

const getAllSpecialty = async (req: Request, res: Response) => {
    try {
        const specialties = await specialtyService.getAllSpecialty();

        res.status(200).json({
            success: true,
            message: 'Get Specialty successfully',
            data: specialties
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to get specialty",
            error: error.message
        })
    }
}

const deleteSpecialty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await specialtyService.deleteSpecialty(id as string);
        res.status(200).json({
            success: true,
            message: 'delete Specialty successfully',
            data: result
        })


    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to delete specialty",
            error: error.message
        })
    }
}

export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}