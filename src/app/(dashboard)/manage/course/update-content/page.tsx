import PageNotFound from '@/app/not-found';
import CourseUpdateContent from '@/components/course/CourseUpdateContent';
import Heading from '@/components/typography/Heading';
import { getCourseBySlug } from '@/lib/actions/course.actions';
import React from 'react'

const page = async ({ searchParams, }: {
    searchParams: { slug: string; };
}) => {
    const findCourse = await getCourseBySlug({ slug: searchParams.slug });
    if (!findCourse) return <PageNotFound></PageNotFound>;
    return (
        <>
            <Heading className="mb-8">Cập nhật: <strong className='text-primary'>{findCourse.title}</strong></Heading>
            <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))}></CourseUpdateContent>
        </>
    )
}

export default page