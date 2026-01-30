import React from "react";
import { menuItems } from "@/constants";
import ActiveLink from "../common/ActiveLink";
import { TMenuItem } from "@/app/types";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <a href="/" className="text-center font-bold text-3xl block mb-5">
        <span className="text-primary font-extrabold text-4xl">U</span>cademy
      </a>
      <ul>
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={`menu-${index}`} url={item.url} title={item.title} icon={item.icon} ></MenuItem>
          )
        })}
      </ul>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url} >
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;