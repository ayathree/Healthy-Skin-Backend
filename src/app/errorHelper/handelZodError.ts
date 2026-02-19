import z, { success } from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import status from "http-status";

export const handelZodError = (err: z.ZodError): TErrorResponse => {
    const statusCode = status.BAD_REQUEST;
    const message = "Zod validation error";
    const errorSources: TErrorSources[] = []

    err.issues.forEach(issue => {
        errorSources.push({
            path: issue.path.join(" => "),
            message: issue.message
        })
    })

    return {
        success: false,
        message,
        errorSources,
        statusCode
    }

}