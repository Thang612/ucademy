import PageNotFound from "@/app/not-found";
import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { levelDisplay } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ILecture } from "@/database/lecture.model";

const page = async ({ params }: { params: { slug: string } }) => {
    const data = await getCourseBySlug({ slug: params.slug, });
    if (!data) return <PageNotFound></PageNotFound>;
    const lectures = data.lectures || [];
    return (
        <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
            <div>
                <div className="relative aspect-video mb-5">
                    {data.intro_url ? (
                        <iframe
                            src={data.intro_url} />) : <Image
                        src={data.image || "https://via.placeholder.com/300x200?text=No+Image"}
                        alt={data.title}
                        fill
                        className="w-full h-full object-cover rounded-lg"
                    />}

                </div>
                <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
                <BoxSection title="Mô tả">
                    <div className="leading-normal">{data.desc}</div>
                </BoxSection>
                <BoxSection title="Thông tin">
                    <div className="grid grid-cols-4 gap-5 mb-10">
                        <BoxInfo title="Bài học">100</BoxInfo>
                        <BoxInfo title="Lượt xem">{data.views}</BoxInfo>
                        <BoxInfo title="Trình độ">{levelDisplay[data.level]}</BoxInfo>
                        <BoxInfo title="Thời lượng">100</BoxInfo>
                    </div>
                </BoxSection>
                <BoxSection title="Chi tiết khóa học">
                    <div className="flex flex-col gap-4 mb-6">
                        {lectures.map((lecture: ILecture) => (
                            <Accordion type="single" collapsible defaultValue={lecture._id.toString()} key={lecture._id.toString()}>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="bg-white dark:bg-grayDarker px-5 py-4 border border-slate-100 dark:border-slate-700 rounded-md ">
                                        <div className="flex justify-between gap-4 w-full mr-2 items-center">
                                            <div className="w-full">{lecture.title}</div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="mt-2 bg-white dark:bg-grayDarker px-5 py-4 border border-t-0 border-slate-100 dark:border-slate-700 rounded-md">
                                        Yes. It adheres to the WAI-ARIA design pattern.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </BoxSection>
                <BoxSection title="Yêu cầu">
                    {data.info.requirements.map((r, index) => (
                        <div key={index}>{r}</div>
                    ))}
                </BoxSection>
                <BoxSection title="Lợi ích">
                    {data.info.requirements.map((r, index) => (
                        <div key={index}>{r}</div>
                    ))}
                </BoxSection>
                <BoxSection title="Q.A">
                    {data.info.qa.map((qa, index) => (
                        <div key={index}>
                            <Accordion type="single" collapsible defaultValue={`item-${index}`}>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="bg-white dark:bg-grayDarker px-5 py-4 border border-slate-100 dark:border-slate-700 rounded-md">{qa.question}</AccordionTrigger>
                                    <AccordionContent className="mt-2 bg-white dark:bg-grayDarker px-5 py-4 border border-t-0 border-slate-100 dark:border-slate-700 rounded-md">
                                        {qa.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    ))}
                </BoxSection>
            </div>
            <div>
                <div className="bg-white dark:bg-grayDarker rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <strong className="text-primary text-xl font-bold">
                            {data.price}
                        </strong>
                        <span className="text-slate-400 line-through text-sm">
                            {data.sale_price}
                        </span>
                        <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
                            {Math.floor((data.price / data.sale_price) * 100)}%
                        </span>
                    </div>
                    <h3 className="font-bold mb-3 text-sm">Khóa học gồm có:</h3>
                    <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
                        <li className="flex items-center gap-2">
                            <IconPlay className="size-4" />
                            <span>30h học</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <IconPlay className="size-4" />
                            <span>Video Full HD</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <IconUsers className="size-4" />
                            <span>Có nhóm hỗ trợ</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <IconStudy className="size-4" />
                            <span>Tài liệu kèm theo</span>
                        </li>
                    </ul>
                    <Button variant="primary" className="w-full">
                        Mua khóa học
                    </Button>
                </div>
            </div>
        </div>
    );
};

function BoxInfo({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-lg p-5 dark:bg-grayDarker">
            <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
            <h3 className="font-bold">{children}</h3>
        </div>
    );
}

function BoxSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <h2 className="font-bold text-xl mb-5">{title}</h2>
            <div className="mb-10">{children}</div>
        </>
    );
}

export default page;
