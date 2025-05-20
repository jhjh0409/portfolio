"use client";
import { isMobile } from "@/lib/utils";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { Navlink } from "./Navlink";
import { navlinks } from "./navlinks";
import { socials } from "./socials";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (isMobile()) {
      setOpen(false);
      setMobile(true);
    }
  }, []);

  return (
    <>
      {!open && mobile && (
        <button
          className="fixed top-4 left-4 z-[150] p-2 bg-white rounded-md shadow-md lg:hidden"
          onClick={() => setOpen(true)}
        >
          <IconMenu2 className="h-6 w-6 text-secondary" />
        </button>
      )}

      {open && (
        <div
          className={twMerge(
            "px-6 z-[100] py-10 bg-neutral-100 fixed lg:relative h-screen left-0 flex flex-col justify-between transition-all duration-300",
            collapsed ? "max-w-[4.5rem] px-3" : "max-w-[14rem] lg:w-fit"
          )}
        >
          <div className="flex-1 overflow-auto">
            <SidebarHeader collapsed={collapsed} />
            <Navigation setOpen={setOpen} collapsed={collapsed} />
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="h-8 w-8 border border-neutral-200 rounded-full backdrop-blur-sm flex items-center justify-center"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <IconLayoutSidebarRightCollapse className="h-4 w-4 text-secondary" />
              ) : (
                <IconLayoutSidebarLeftCollapse className="h-4 w-4 text-secondary" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Navigation = ({
  setOpen,
  collapsed,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center py-2 px-2 rounded-md text-sm",
            !collapsed && "space-x-2",
            collapsed && "justify-center",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
          title={collapsed ? link.label : ""}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          {!collapsed && <span>{link.label}</span>}
        </Link>
      ))}

      <Heading
        as="p"
        className={twMerge(
          "text-sm md:text-sm lg:text-sm pt-10 px-2",
          collapsed && "text-center"
        )}
      >
        {collapsed ? "" : "Socials"}
      </Heading>

      {socials.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center py-2 px-2 rounded-md text-sm",
            !collapsed && "space-x-2",
            collapsed && "justify-center"
          )}
          title={collapsed ? link.label : ""}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          {!collapsed && <span>{link.label}</span>}
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={twMerge("flex", collapsed ? "justify-center" : "space-x-2")}>
      {!collapsed && (
        <div className="flex text-sm flex-col ml-2">
          <p className="font-bold text-primary">Tok Jing Huan</p>
          <p className="font-light text-secondary">Computer Science Major</p>
        </div>
      )}
      {collapsed && (
        <div className="flex justify-center items-center h-8 w-8 rounded-full bg-primary text-white font-bold">
          JH
        </div>
      )}
    </div>
  );
};
