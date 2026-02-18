"use server"
import { TCreateCourseParams, TUpdateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import { ECourseStatus } from "@/types/enum";

export async function deleteCourse(slug: string, params?: string) {
    try {
        connectToDatabase();
        await Course.findOneAndUpdate({ slug }, { _destroy: true, status: ECourseStatus.PENDING }, { new: true });
        revalidatePath(params || "/manage/course");
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCourses(): Promise<ICourse[] | undefined> {
    try {
        connectToDatabase();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        console.log(error);
    }
}

export async function getCourseBySlug({ slug, }: { slug: string; }): Promise<ICourse | undefined> {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug });
        return findCourse;
    } catch (error) {
        console.log(error);
    }
}

export async function createCourse(params: TCreateCourseParams) {
    try {
        connectToDatabase()
        const course = await Course.create(params)
        return {
            success: true,
            data: JSON.parse(JSON.stringify(course))
        }
    } catch (error) {
        console.log({ error })
    }
}


export async function updateCourse(params: TUpdateCourseParams, path?: string) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug: params.slug });
        if (!findCourse) return;
        await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
            new: true,
        });
        revalidatePath(path || "/manage/course");
        return {
            success: true,
            message: "Cập nhật khóa học thành công!",
        };
    } catch (error) {
        console.log(error);
    }
}
