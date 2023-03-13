import Image from "next/image";
import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";

export default function section1() {
  return (
    <div className="hero flex md:flex-row flex-col justify-around items-center min-w-7xl">
      {/**textual area */}
      <div className="flex flex-col items-start md:ml-20 mx-10 mt-10 md:mt-0">
        <p className="text-orange-500">El valor es como el amor,</p>
        <h2 className="font-bold md:text-6xl text-5xl text-gray-800">
          Debe tener esperanza para su nutrición.
        </h2>
        <p className="md:text-base teat-sm font-semibold text-gray-400 mt-5">
          La primera riqueza es la salud.
        </p>
        <div className="mt-10 flex justify-center items-center gap-5">
          <button className="text-white bg-green-500 font-semibold rounded-full px-5 md:py-4 hover:bg-black hover:shadow-lg">
            Agendar cita
          </button>
        </div>
      </div>
      {/**image area */}
      <div className="mr-20 md:block hidden ">
        <Image className="w-full rounded lg:w-1/3"
          src={"/images/Dise.png"}
          alt="description of image"
          width={1500}
          height={1000}
        />
      </div>
    </div>
  );
}