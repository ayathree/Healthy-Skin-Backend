import { Gender } from "../../../generated/prisma/enums";

export interface ICreateDoctorPayload {
    password: string;
    doctor: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        registrationNumber: string;
        experience?: number;
        gender: Gender;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string

    }

    specialities: string[]
}

export interface ICreateAdmin {
    password: string;
    admin: {
        name: string;
        email: string;
        contactNumber?: string;
        profilePhoto?: string;
    };
}

export interface ICreateSuperAdmin {
    password: string;
    admin: {
        name: string;
        email: string;
        contactNumber?: string;
        profilePhoto?: string;
    };
}