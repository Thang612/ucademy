"use client"
import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModelToggle";
import Link from "next/link";
import { IconUsers } from "../icons";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="flex-row flex lg:flex-col w-full lg:w-[300px] fixed left-0 bottom-0 lg:top-0 lg:h-full  p-4 border-r border-r-gray-200 bg-white  dark:bg-grayDarker dark:border-opacity-10">
      <a href="/" className="hidden lg:inline-block font-bold text-3xl  mb-5">
        <span className="text-primary">U</span>
        cademy
      </a>
      <ul className="flex-row flex lg:flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="flex-row-reverse lg:flex-row mt-auto flex gap-5 items-center justify-end">
        <ModeToggle />
        {!userId ? (
          <Link
            href="/sign-in"
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
          >
            <IconUsers />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        <span className="hidden lg:inline ">{title}</span>
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
