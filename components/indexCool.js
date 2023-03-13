import { SignOut, Calendar, UserCircle, List } from "phosphor-react";
import { useContext, useEffect, useRef } from "react";
import { GoDashboard } from "react-icons/go";
import { FaLeaf } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Link from "next/link";
import { DataContext } from "../context/dataContext";
import { useCookies } from "react-cookie";
import { isAuthenticated, logOut } from "../utils/AuthService";
import { useRouter } from "next/router";

export default function navbar() {
  const sideBarRef = useRef();

  function toogleSideBar() {
    sideBarRef.current.classList.toggle("-translate-x-full");
  }

  const { currentUser, setCurrentUser } = useContext(DataContext);
  const checkLoggedIn = async () => {
    let cuser = isAuthenticated();
    setCurrentUser(cuser);
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const [cookie, setCookie] = useCookies(["user"]);
  const { push } = useRouter();

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
    <div className="max-h-screen md:sticky md:top-0 z-50 text-white">
      {/* MOBILE SIDEBAR */}
      <div className="bg-teal-500 flex justify-between p-2 items-center sticky top-0 z-30">
        <div className="block text-white font-extrabold dark:text-dw text-2xl">
          <span>
            <h1 className="font-bold text-3xl text-black">Nutriña</h1>
          </span>
        </div>
        <button className="rounded focus:bg-teal-800" onClick={toogleSideBar}>
          <List size={32} />
        </button>
      </div>
      {/* MAIN SIDEBAR */}
      <div
        ref={sideBarRef}
        className="bg-teal-500 w-48 space-y-10 px-5 py-7  absolute inset-y-0 left-0 transform -translate-x-full
        md:translate-x-0 z-50 transition duration-200 ease-in-out flex flex-col child:transition-all md:max-h-screen md:min-h-screen md:sticky md:top-0"
      >
        <div className="flex items-center pl-1 gap-4">
          <FaLeaf className="h-8 w-8 text-green-700" />
          <span>
            <h1 className="font-bold text-3xl text-black">Nutriña</h1>
          </span>
        </div>

        <nav className="flex flex-col grow space-y-3">
          <Link href="/admin/patients" passHref>
            <a className="flex flex-row py-2.5 px-4 transition duration-200 rounded items-center space-x-3 hover:bg-blue-600 hover:text-white">
              <UserCircle size={30} />
              <p className="font-bold text-1xl">Pacientes</p>
            </a>
          </Link>
          <Link href="/admin/diary">
            <div className="flex flex-row py-2.5 px-4 transition duration-200 rounded items-center space-x-3 hover:bg-blue-600 hover:text-white">
              <Calendar size={30} />
              <p className="font-bold text-1xl">Agenda</p>
            </div>
          </Link>
          <Link href="/admin/dashbord" passHref>
            <a className="flex flex-row py-2.5 px-4 transition duration-200 rounded items-center space-x-3 hover:bg-blue-600 hover:text-white">
              <GoDashboard size={30} />
              <p className="font-bold text-1xl">Dashbord</p>
            </a>
          </Link>
          <Link href="/admin/profile" passHref>
            <a className="flex flex-row py-2.5 px-4 transition duration-200 rounded items-center space-x-3 hover:bg-blue-600 hover:text-white">
              <ImProfile size={30} />
              <p className="font-bold text-1xl"> Perfil</p>
            </a>
          </Link>
        </nav>

        <button
          onClick={() => logOutHandedl()}
          color="error"
          className="flex flex-row w-full items-center  rounded py-2.5 my-8 space-x-2 hover:bg-red-500 hover:text-white transition duration-200"
        >
          <SignOut className=" mx-2" size={30} />
          <a>Logout</a>
        </button>
      </div>
    </div>
  );
}
