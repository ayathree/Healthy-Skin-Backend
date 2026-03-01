import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllAdmins = catchAsync(
    async (req: Request, res: Response) => {
        const result = await adminService.getAllAdmins();
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Admins fetched successfully",
            data: result
        })
    }
)

const getAdminById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await adminService.getAdminById(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin retrieved successfully",
        data: result,
    });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await adminService.updateAdmin(id as string, req.body);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin updated successfully",
        data: result,
    });
});

const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user

    const result = await adminService.softDeleteAdmin(id as string, user);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin deleted successfully",
        data: result,
    });
});


export const adminController = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    softDeleteAdmin
}