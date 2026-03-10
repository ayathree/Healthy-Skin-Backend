import { IQueryParams } from "../../interfaces/query.interface";
import { prisma } from "../../lib/prisma"
import { QueryBuilder } from "../../utils/queryBuilders";
import { doctorFileterableFields, doctorSearchableFields } from "./doctor.constant";
import { IUpdateDoctor } from "./doctor.interface";

const getAllDoctors = async (query: IQueryParams) => {
    // // Fetch all non-deleted doctors
    // const result = await prisma.doctor.findMany({
    //     where: {
    //         isDeleted: false,
    //     },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         profilePhoto: true,
    //         contactNumber: true,
    //         registrationNumber: true,
    //         experience: true,
    //         gender: true,
    //         appointmentFee: true,
    //         qualification: true,
    //         currentWorkingPlace: true,
    //         designation: true,
    //         averageRating: true,
    //         createdAt: true,
    //         updatedAt: true,
    //         specialties: {
    //             select: {
    //                 specialty: {
    //                     select: {
    //                         id: true,
    //                         title: true,
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // });

    // // Transform specialties (flatten structure)
    // const doctors = result.map((doctor) => ({
    //     ...doctor,
    //     specialties: doctor.specialties.map((s) => s.specialty),
    // }));

    // return doctors;

    const queryBuilder = new QueryBuilder(
        prisma.doctor,
        query,
        {
            searchableFields: doctorSearchableFields,
            filterableFields: doctorFileterableFields
        }
    )
};

const getDoctorById = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            specialties: {
                include: {
                    specialty: true,
                },
            },
        },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    // Transform specialties to flatten structure
    return {
        ...doctor,
        specialties: doctor.specialties.map((s) => s.specialty),
    };
};

const updateDoctor = async (id: string, payload: IUpdateDoctor) => {
    // Check if doctor exists and not deleted
    const existingDoctor = await prisma.doctor.findUnique({
        where: { id, isDeleted: false },
    });

    if (!existingDoctor) {
        throw new Error("Doctor not found");
    }

    // Separate specialties from doctor data
    const { specialties, ...doctorData } = payload;

    // Update doctor basic information
    const updatedDoctor = await prisma.doctor.update({
        where: { id },
        data: doctorData,
        include: {
            specialties: {
                include: {
                    specialty: true,
                },
            },
        },
    });

    // If specialties are provided, update them separately
    if (specialties && specialties.length > 0) {
        // Delete old specialties
        await prisma.doctorSpecialty.deleteMany({
            where: { doctorId: id },
        });

        // Add new specialties
        const specialtiesData = specialties.map((specialtyId) => ({
            doctorId: id,
            specialtyId,
        }));

        await prisma.doctorSpecialty.createMany({
            data: specialtiesData,
        });

        // Fetch updated doctor with new specialties
        const result = await prisma.doctor.findUnique({
            where: { id },
            include: {
                specialties: {
                    include: {
                        specialty: true,
                    },
                },
            },
        });

        return {
            ...result,
            specialties: result?.specialties.map((s) => s.specialty) || [],
        };
    }

    // Return updated doctor with transformed specialties
    return {
        ...updatedDoctor,
        specialties: updatedDoctor.specialties.map((s) => s.specialty),
    };
};

const softDeleteDoctor = async (id: string) => {
    // Check if doctor exists and not already deleted
    const doctor = await prisma.doctor.findUnique({
        where: { id },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    if (doctor.isDeleted) {
        throw new Error("Doctor is already deleted");
    }

    // Mark doctor as deleted
    const result = await prisma.doctor.update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });

    return result;
};

export const DoctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    softDeleteDoctor,
}