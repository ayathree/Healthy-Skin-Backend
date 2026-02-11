import { Role, User, UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";


interface IRegisterPatientPayload {
    name: string,
    email: string,
    password: string
}


const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            // needPasswordChange:false,
            // role:Role.PATIENT
        }
    })

    if (!data.user) {
        throw new Error("Failed to register")
    }

    return data
}

interface ILoginPatientPayload {
    email: string,
    password: string
}

const loginUser = async (payload: ILoginPatientPayload) => {
    const { email, password } = payload;
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked")
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted")
    }
    return data

}

export const AuthService = {
    registerPatient, loginUser
}