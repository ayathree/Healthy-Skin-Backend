import { prisma } from "../../lib/prisma";
import { IUpdateDoctor } from "../doctor/doctor.interface";
import { IUpdateadmin } from "./admin.interface";

const getAllAdmins = async () => {
    // Fetch all non-deleted admins
    const result = await prisma.admin.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            createdAt: true,
            updatedAt: true,
        },
    });


    return result;
};

const getAdminById = async (id: string) => {
    const admin = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false,
        },

    });

    if (!admin) {
        throw new Error("Admin not found");
    }

    // Transform specialties to flatten structure
    return admin
}

const updateAdmin = async (id: string, payload: IUpdateadmin) => {
    // Check if admin exists and not deleted
    const existingAdmin = await prisma.admin.findUnique({
        where: { id, isDeleted: false },
    });

    if (!existingAdmin) {
        throw new Error("Admin not found");
    }

    const adminData = payload;

    // Update doctor basic information
    const updatedAdmin = await prisma.admin.update({
        where: { id },
        data: adminData,

    });


    return updatedAdmin

}

const softDeleteAdmin = async (id: string) => {
    // Check if admin exists and not already deleted
    const admin = await prisma.admin.findUnique({
        where: { id },
    });

    if (!admin) {
        throw new Error("Admin not found");
    }

    if (admin.isDeleted) {
        throw new Error("Admin is already deleted");
    }

    // Mark admin as deleted
    const result = await prisma.admin.update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });

    return result;
};
export const adminService = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    softDeleteAdmin
}