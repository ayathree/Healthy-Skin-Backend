import { NextFunction, Request, Response } from "express";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { CookieUtils } from "../utils/cookie";
import { prisma } from "../lib/prisma";
import AppError from "../errorHelper/appError";
import status from "http-status";
import { jwtUtils } from "../utils/jwt";
import { envVars } from "../config/env";

export const checkAuth = (...authRoles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        //session token
        const seesionToken = CookieUtils.getCookie(req, 'better-auth.session_token');
        if (!seesionToken) {
            throw new Error('Unauthorized access! No session token provided. ')
        }

        if (seesionToken) {
            const sessionExists = await prisma.session.findFirst({
                where: {
                    token: seesionToken,
                    expiresAt: {
                        gt: new Date()
                    }
                },
                include: {
                    user: true
                }
            })

            if (sessionExists && sessionExists.user) {
                const user = sessionExists.user;
                const now = new Date();
                const expiresAt = new Date(sessionExists.expiresAt);
                const createdAt = new Date(sessionExists.createdAt);
                const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
                const timeRemaining = expiresAt.getTime() - now.getTime();
                const percentRemaining = (timeRemaining / sessionLifeTime) * 100
                if (percentRemaining < 20) {
                    res.setHeader('X-Session-Refresh', 'true');
                    res.setHeader('X-Session-Expires-At', expiresAt.toISOString());
                    res.setHeader('X-Time-Remaining', timeRemaining.toString());
                    console.log("session expiring soon")
                }

                if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
                    throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! User is not active.')
                }

                if (user.isDeleted) {
                    throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! User is deleted')
                }

                if (authRoles.length > 0 && !authRoles.includes(user.role)) {
                    throw new AppError(status.FORBIDDEN, "Forbidden access! You do not have permission to access this resource.")
                }

                req.user = {
                    userId: user.id,
                    role: user.role,
                    email: user.email,
                }


            }


            const accessToken = CookieUtils.getCookie(req, 'accessToken');

            if (!accessToken) {
                throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! No access token provided.')
            }
        }

        //access token

        const accessToken = CookieUtils.getCookie(req, 'accessToken');

        if (!accessToken) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! No access token provided.')
        }
        const verificationToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET)

        if (!verificationToken.success) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! Invalid access token.')
        }

        if (authRoles.length > 0 && !authRoles.includes(verificationToken.data!.role as Role)) {
            throw new AppError(status.FORBIDDEN, "Forbidden access! You do not have permission to access this resource.")
        }

        next()
    } catch (error: any) {
        next(error)

    }
}