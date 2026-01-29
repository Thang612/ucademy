import React from "react";
import { menuItems } from "@/constants";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        Ucademy
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

function MenuItem({ url = "/", title = "", icon }: { url: string; title: string, icon: React.ReactNode }) {
  return (
    <li className=" flex items-center gap-3 px-4 py-2 rounded-xl hover:text-primary hover:bg-primary hover:bg-opacity-30 transition-all">
      {icon}
      <a href={url} className="p-3 rounded-md flex items-center">
        {title}
      </a>
    </li>
  );
}

export default Sidebar;
