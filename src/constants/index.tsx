import { TMenuItem } from "@/app/types"
import { IconExplore, IconPlay } from "@/components/icons/"

export const menuItems: TMenuItem[] = [{
    url: '/',
    title: 'Khu vực học tập',
    icon: <IconPlay className="size-5" />
}, {
    url: '/explore',
    title: 'Khám phá',
    icon: <IconExplore className="size-5" />
}
]