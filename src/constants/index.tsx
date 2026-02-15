import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStudy,
  IconUsers,
} from "@/components/icons";
import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enum";

export const menuItems: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconStudy className="size-5" />,
  },
  {
    url: "/manage/course",
    title: "Quản lý khóa học",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/member",
    title: "Quản lý thành viên",
    icon: <IconUsers className="size-5" />,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-5" />,
  },
];

export const courseStatus: { title: string, value: ECourseStatus }[] = [{
  title: "Đã duyệt",
  value: ECourseStatus.APPROVED
}, {
  title: "Chờ duyệt",
  value: ECourseStatus.PENDING
}, {
  title: "Từ chối",
  value: ECourseStatus.REJECTED
}]

export const courseLevel: { title: string, value: ECourseLevel }[] = [{
  title: "Mới bắt đầu",
  value: ECourseLevel.BEGINNER
}, {
  title: "Trung bình",
  value: ECourseLevel.INTERMEDIATE
}, {
  title: "Nâng cao",
  value: ECourseLevel.ADVANCED
}]