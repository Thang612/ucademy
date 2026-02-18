import CourseManange from "@/components/course/CourseManange";
import Heading from "@/components/typography/Heading";
import { getAllCourses } from "@/lib/actions/course.actions";

const page = async () => {
  const courses = await getAllCourses() || [];
  return <>
    <Heading className="mb-5">Quản lý khóa học </Heading>
    <CourseManange courses={JSON.parse(JSON.stringify(courses))}></CourseManange>
  </>;
};

export default page;
