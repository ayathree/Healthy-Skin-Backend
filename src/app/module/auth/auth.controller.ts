import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body

        const result = await AuthService.registerPatient(payload)

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Patient Register Successfuly",
            data: result
        })
    }
)

const loginPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body

        const result = await AuthService.loginUser(payload)

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Patient logged in Successfuly",
            data: result
        })
    }
)

export const AuthController = {
    registerPatient, loginPatient
}