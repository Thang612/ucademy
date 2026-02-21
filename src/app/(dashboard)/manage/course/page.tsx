import CourseManange from "@/components/course/CourseManange";
import { IconAdd } from "@/components/icons";
import Heading from "@/components/typography/Heading";
import { getAllCourses } from "@/lib/actions/course.actions";
import Link from "next/link";

const page = async () => {
  const courses = await getAllCourses() || [];
  return <>
    <Heading className="mb-5">Quản lý khóa học </Heading>
    <CourseManange courses={JSON.parse(JSON.stringify(courses))}></CourseManange>
    <Link href="/manage/course/new" className="fixed bottom-4 right-4 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer animate-bounce transition-all hover:animate-none">
      <IconAdd />
    </Link>
  </>;
};

export default page;
