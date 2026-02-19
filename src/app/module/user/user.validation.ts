import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is require").min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 character"),
    doctor: z.object({
        name: z.string("name is required").min(5, "Name must be at least 5 character").max(30, "Name must be at most 30 character"),
        email: z.email("Invalid email address"),
        contactNumber: z.string("Contact number is required").min(11, "Contact number must be at least 11 character").max(15, "Contact number must be at most 15 character"),
        address: z.string("Address is required").min(10, "Address must be at least 10 character").max(100, "Address must be at most 100 character").optional(),
        registrationNumber: z.string("Registration number is required"),
        // profilePhoto:z.string("Profile photo is required"),
        experience: z.int("Experience must be an integer").nonnegative("Experience must be a non-negative integer").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE], 'Gender must be either "MALE" or "FEMALE"'),
        appointmentFee: z.number("Appointment fee must be a number").nonnegative("Appointment fee must be a non-negative number"),
        qualification: z.string("Qualification is required").min(5, "Qualification must be at least 5 character").max(50, "Qualification must be at most 50 character"),
        currentWorkingPlace: z.string("Current working place is required").min(5, "Current working place must be at least 5 character").max(50, "Current working place must be at most 50 character"),
        designation: z.string("Designation is required").min(3, "Designation must be at least 3 character").max(50, "Designation must be at most 50 character")
    }),
    specialities: z.array(z.uuid(), "Specialty must be an array of strings").min(1, "At least one specialty is required")
})