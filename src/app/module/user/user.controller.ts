import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

const createdDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await UserService.createDoctor(payload);

        const { accessToken, refreshToken, token, ...rest } = result
        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token as string)

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Doctor registered successfully",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }
        })
    }
)

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAdmin(req.body);

    const { accessToken, refreshToken, token, ...rest } = result
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token as string)

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Admin created successfully",
        data: {
            token,
            accessToken,
            refreshToken,
            ...rest
        }
    });
});

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createSuperAdmin(req.body);

    const { accessToken, refreshToken, token, ...rest } = result
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token as string)

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Super Admin created successfully",
        data: {
            token,
            accessToken,
            refreshToken,
            ...rest
        },
    });
});

export const UserController = {
    createdDoctor,
    createAdmin,
    createSuperAdmin
}