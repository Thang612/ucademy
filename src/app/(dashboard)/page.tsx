import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import { getAllCourses } from "@/lib/actions/course.actions";


const page = async () => {
  const courses = await getAllCourses();
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.map((course) => (
          <CourseItem key={course.slug} data={course}></CourseItem>
        ))}
      </CourseGrid>
    </div>
  );
};

export default page;
