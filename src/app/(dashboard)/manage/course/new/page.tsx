import CourseAddNew from '@/components/course/CourseAddNew'
import Heading from '@/components/typography/Heading'
import React from 'react'

function page() {
    return (
        <>
            <Heading>Tạo khóa học mới</Heading>
            <CourseAddNew />
        </>
    )
}

export default page