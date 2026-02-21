"use server"
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ _id: params.course });
        if (!findCourse) return;
        const newLecture = await Lecture.create(params);
        findCourse.lectures.push(newLecture._id);
        findCourse.save();
        revalidatePath(params.path || "/");
        return {
            success: true,
        }
    } catch (error) {
        console.error("Error adding lecture:", error);
        throw error;
    }
}

export async function updateLecture(params: TUpdateLectureParams) {
    try {
        connectToDatabase();
        const res = await Lecture.findOneAndUpdate({ _id: params.lectureId }, params.updateData, {
            new: true
        });
        if (!res) {
            return;
        }
        revalidatePath(params.updateData.path || "/");

        return {
            success: true,
        }
    } catch (error) {
        console.error("Error updating lecture:", error);
        throw error;
    }
}