import React from "react";
import { GrGroup } from "react-icons/gr";

export default function CardUserChart() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1 flex items-center pl-1 gap-4">
              <h6 className="text-blueGray-700 text-xl font-semibold">
                Número de pacientes
              </h6>
              <GrGroup className="h-8 w-8 text-green-700" />
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <h1>Hola</h1>
        </div>
      </div>
    </>
  );
}
