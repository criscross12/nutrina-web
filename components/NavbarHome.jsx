import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Acerca de", href: "#", current: true },
  { name: "Servicios", href: "#", current: true },
  { name: "Contactos", href: "#", current: true },
  { name: "Iniciar Sesión", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarHome() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <Disclosure as="nav" className={"bg-white"}>
      {({ open }) => (
        <>
          <div className="min-w-7xl mx-auto border-b border-gray-50 bg-white px-2 sm:px-6 lg:px-8">
            <div className="relative mx-0 flex h-16 items-center justify-between md:mx-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className={
                    "inline-flex items-center justify-center rounded-md p-2 text-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  }
                >
                  <span className="">Open main menu</span>
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
