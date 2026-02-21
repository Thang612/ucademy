"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { IconCancel, IconCheck, IconDelete, IconEdit } from "../icons"
import { commonClass } from "@/constants"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { createLecture, updateLecture } from "@/lib/actions/lecture.action"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { TCourseUpdateParams } from "@/types"
import { ILecture } from "@/database/lecture.model"
import { useState } from "react"

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
    const lectures = course.lectures || [];
    console.log({ lectures })

    const handleAddCourse = async () => {
        try {
            const res = await createLecture({
                title: "Chương mới",
                course: course._id.toString(),
                order: lectures.length + 1,
                path: `/manage/course/update-content?slug=${course.slug}`
            });
            if (res?.success) {
                toast.success("Thêm chương mới thành công!");
            }
        } catch (error) {
            console.error("Error adding lecture:", error);
            toast.error("Có lỗi xảy ra khi thêm chương mới!");
        }
    }

    const handleDeleteLecture = (lectureId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to delete this lecture!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    updateLecture({
                        lectureId,
                        updateData: {
                            _destroy: true,
                            path: `/manage/course/update-content?slug=${course.slug}`
                        }
                    }).then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    });
                }
            });
        } catch (error) {
            console.error("Error deleting lecture:", error);
            toast.error("Có lỗi xảy ra khi xóa chương!");
        }
    }

    const [lectureIndexId, setLectureIndexId] = useState("");
    const [lectureEdit, setLectureEdit] = useState("");

    const handleUpdateLecture = async () => {
        try {
            if (lectureEdit.trim() === "") {
                setLectureIndexId("");
                setLectureEdit("");
                return;
            }
            const res = await updateLecture({
                lectureId: lectureIndexId,
                updateData: {
                    title: lectureEdit,
                    path: `/manage/course/update-content?slug=${course.slug}`
                }
            })
            if (res?.success) {
                toast.success("Cập nhật chương thành công!");
                setLectureIndexId("");
                setLectureEdit("");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật chương!");
            setLectureIndexId("");
            setLectureEdit("");

        }
    }

    return (
        <>
            <div className="flex flex-col gap-4 mb-6">
                {lectures.map((lecture: ILecture) => (
                    <Accordion type="single" collapsible={!lectureIndexId} defaultValue="item-1" key={lecture._id.toString()}>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="bg-white dark:bg-grayDarker px-5 py-4 border border-slate-100 dark:border-slate-700 rounded-md ">
                                <div className="flex justify-between gap-4 w-full mr-2 items-center">
                                    {
                                        lectureIndexId === lecture._id.toString() ? (
                                            <>
                                                <div className="w-full">
                                                    <Input className="w-full" type="text" placeholder="Tên chương"
                                                        defaultValue={lecture.title}
                                                        onChange={(e) => setLectureEdit(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex gap-1 items-center">
                                                    <span className={`${commonClass.buttonIcon} flex justify-center items-center`} onClick={() => handleUpdateLecture()}><IconCheck /></span>
                                                    <span className={`${commonClass.buttonIcon} flex justify-center items-center`} onClick={() => setLectureIndexId("")}><IconCancel /></span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-full">{lecture.title}</div>
                                                <div className="flex gap-1 items-center">
                                                    <span className={`${commonClass.buttonIcon} flex justify-center items-center`} onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLectureIndexId(lecture._id.toString());
                                                    }}><IconEdit /></span>
                                                    <span className={`${commonClass.buttonIcon} flex justify-center items-center`} onClick={() => handleDeleteLecture(lecture._id.toString())}><IconDelete /></span>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 bg-white dark:bg-grayDarker px-5 py-4 border border-t-0 border-slate-100 dark:border-slate-700 rounded-md">
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
            <Button variant="default" onClick={handleAddCourse}>Thêm chương mới</Button>
            {lectures.length <= 0 && (
                <>
                    <div className="text-center py-10 text-slate-500">
                        Chưa có bài học nào được thêm vào khóa học này.
                    </div>
                </>
            )}
        </>
    )
}

export default CourseUpdateContent