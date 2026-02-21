'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { IconDelete, IconEdit, IconEye, IconStudy } from "../icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { commonClass, statusDisplay, statusStyle } from "@/constants"
import { ICourse } from "@/database/course.model"
import Swal from 'sweetalert2'
import { deleteCourse, updateCourse } from "@/lib/actions/course.actions"
import { revalidatePath } from "next/cache"
import { ECourseStatus } from "@/types/enum"


const CourseManange = ({ courses }: { courses: ICourse[] }) => {
    const handleDeleteCourse = (slug: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this course!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCourse(slug, "/manage/course").then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                });
            }
        });
    }

    const handleChangeStatus = (slug: string, status: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this course!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateCourse({ slug, updateData: { status: status === ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING, _destroy: status === ECourseStatus.PENDING ? true : false } }, "/manage/course").then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                });
            }
        });
    }

    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white dark:bg-grayDarker dark:border-opacity-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Thông tin</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow className="row__responsive" key={course.slug}>
                            <TableCell >
                                <div className="flex items-center gap-3">
                                    <Image src={course.image}
                                        alt="Course Image"
                                        width={60}
                                        height={60}
                                        className="flex-shrink-0 size-20 rounded-md object-cover"
                                    ></Image>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-nowrap">{course.title}</h3>
                                        <h4 className="text-slate-400 text-xs">{new Date(course.created_at).toLocaleDateString()}</h4>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell><span className="font-semibold">{course.price?.toLocaleString('vi-VN')}đ</span></TableCell>
                            <TableCell><span onClick={() => handleChangeStatus(course.slug, course.status)} className={cn(
                                "cursor-pointer px-2 py-1 rounded-md border bg-current bg-opacity-20 border-current text-nowrap",
                                statusStyle[course.status]
                            )}
                            >{statusDisplay[course.status]}</span></TableCell>
                            <TableCell >
                                <div className="flex gap-3 justify-center items-center">
                                    <Link href={`/manage/course/update-content?slug=${course.slug}`} className={cn(commonClass.buttonIcon)}>
                                        <IconStudy className="size-4" />
                                    </Link>
                                    <Link href={`/manage/course/update?slug=${course.slug}`} className={cn(commonClass.buttonIcon)}>
                                        <IconEdit className="size-4" />
                                    </Link>
                                    <Link href={`/course/${course.slug}`} className={cn(commonClass.buttonIcon)}>
                                        <IconEye className="size-4" />
                                    </Link>
                                    <button onClick={() => handleDeleteCourse(course.slug)} className={cn(commonClass.buttonIcon)}>
                                        <IconDelete className="size-4" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CourseManange