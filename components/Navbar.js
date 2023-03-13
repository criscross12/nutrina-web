import React from "react";
import Link from "next/link";
import {Disclosure} from "@headlessui/react";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrFormClose} from "react-icons/gr";

const Navigation = [
    {name:"Inicio", href:"initial",current:true},
    {name:"Sobre nosotros", href:"page",current:false},
    {name:"Contacto", href:"contact",current:false},
];

function classNames(...classes){
    return classes.filter(Boolean).join(" ");
}

export default function Navbar(){
    return(
        <Disclosure as="nav">
            {({open}) => (
                <>
                <div className="min-w-7xl mx-auto border-b border-gray-500 bg-gradient-to-t from-sky-100  px-2 sm:px-6 lg:px-8">
                    <div className="relative mx-0 flex h-16 items-center justify-between md:mx-20">
                        <div className="absolute inset-y-0 flex items-center sm:hidden">
                            {/**mobile menu btn */}
                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-sky-500 hover:bg-sky-500 hover:text-white focus:outline-none focus:right-2 focus:ring-inset focus:right-white">
                                <span className="sr-only">open main menu</span>
                                {open ? <GrFormClose className="block h-6 w-6" aria-hidden="true"/> : <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true"/>}
                            </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <h1 className="cursor-pointer text-xl font-semibold">
                                    Nutr<span className="text-orange-500">iña</span>
                                    </h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:block md:ml-60">
                                <div className="flex8 space-x-4">
                                    {Navigation.map((item) => (
                                        <a 
                                        href={item.href} 
                                        key={item.name} 
                                        className={classNames( item.current ? "bg-sky-500 text-white shadow-lg" : "text-gray-500 hover:bg-sky-500 hover:text-white hover:shadow-lg", "rounded-full px-3 py-2 text-sm font-medium")}
                                        aria-current={item.current ? "page" : undefined}
                                        >
                                        {" "}
                                        {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link href={"login"}><button className="rounded-full border-orange-100 px-3 py-2 text-sm font-medium text-gray-400 hover:bg-sky-500 hover:text-white hover:shadow-lg">
                                Iniciar sesión
                            </button></Link>
                        </div>
                    </div>
                </div>
                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                    {Navigation.map((item) => (
                                        <Disclosure.Button 
                                        href={item.href}
                                        as="a" 
                                        key={item.name} 
                                        className={classNames( 
                                            item.current 
                                            ? "bg-green-300 text-white shadow-lg" 
                                            : "text-gray-500 hover:bg-green-500 hover:text-white hover:shadow-lg", 
                                            "block rounded-md px-3 py-2 text-base font-medium"
                                            )}
                                        aria-current={item.current ? "page" : undefined}
                                        >
                                        {" "}
                                        {item.name}
                                        </Disclosure.Button>
                                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
