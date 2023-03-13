import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaLeaf } from "react-icons/fa";
import { DataContext } from "../context/dataContext";
import { isAuthenticated, logOut } from "../utils/AuthService";
import { useCookies } from "react-cookie";
import { CollapsIcon, CalendarIcon, LogoutIcon, UsersIcon } from "./icons";

const menuItems = [
  { id: 1, label: "Paciente", icon: UsersIcon, link: "/admin/patients" },
  { id: 2, label: "Agenda", icon: CalendarIcon, link: "/admin/diary" },
  // { id: 3, label: "Reportes", icon: Report, link: "/admin/users" },
  { id: 4, label: "Dashbord", icon: CalendarIcon, link: "/admin/dashbord" },
  { id: 5, label: "Perfil", icon: LogoutIcon, link: "/admin/profile" },
  // { id: 5, label: "Ayuda", icon: HelpIcon, link: "/" },
];

const Sidebar = () => {
  const { currentUser, setCurrentUser } = useContext(DataContext);
  const checkLoggedIn = async () => {
    let cuser = isAuthenticated();
    setCurrentUser(cuser);
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();
  const { push } = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen fixed sticky top-0 px-4 pt-8 pb-4 bg-teal-500 justify-between flex flex-col",
    {
      ["w-60"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-teal-300 rounded w-full overflow-hidden whitespace-nowrap"
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const logOutHandedl = async () => {
    const res = await logOut(currentUser);
    if (res.status == 200) {
      setCookie("user", "", {
        path: "/",
        maxAge: 0,
        sameSite: true,
      });
      push("/");
    }
  };

  return (
    <div className="flex">
      <aside className="h-screen sticky top-0 shadow-2xl">
        <div className="hidden md:block">
          <div
            className={wrapperClasses}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOver}
            style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between relative">
                <div className="flex items-center pl-1 gap-4">
                  <FaLeaf className="h-8 w-8 text-white" />
                  <span
                    className={classNames(
                      "mt-2 text-lg font-medium text-text",
                      {
                        hidden: toggleCollapse,
                      }
                    )}
                  >
                    <h1 className="font-bold">Nutriña</h1>
                  </span>
                </div>
                {isCollapsible && (
                  <button
                    className={collapseIconClasses}
                    onClick={handleSidebarToggle}
                  >
                    <CollapsIcon />
                  </button>
                )}
              </div>

              <div className="flex flex-col items-start mt-24">
                {menuItems.map(({ icon: Icon, ...menu }) => {
                  const classes = getNavItemClasses(menu);
                  return (
                    <div className={classes}>
                      <Link href={menu.link}>
                        <a className="flex py-4 px-3 items-center w-full h-full">
                          <div style={{ width: "2.5rem" }}>
                            <Icon />
                          </div>
                          {!toggleCollapse && (
                            <span
                              className={classNames(
                                "text-md font-medium text-text-light"
                              )}
                            >
                              {menu.label}
                            </span>
                          )}
                        </a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`${getNavItemClasses({})} px-3 py-4 `}
              onClick={() => logOutHandedl()}
            >
              <div style={{ width: "2.5rem" }}>
                <AiOutlineLogout className="h-8 w-8 text-white" />
              </div>
              <span
                className={classNames("text-md font-medium text-text-light")}
              >
                <a>Cerrar sesión</a>
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
