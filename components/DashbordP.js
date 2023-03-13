import React from "react";
import { getMedicalRes } from "../utils/AuthService";
import CardHistory from "./Cards/CardHistory";

export default function DashbordP({ data, access }) {
  const dataM = async () => {
    const res = await getMedicalRes(data["id"], data["type"], access);
    return res;
  };
  dataM().then((e) => {
    return e;
  });

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <h2>Número de pacientes</h2>
        </div>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardHistory />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div> */}
        {/* <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div> */}
      </div>{" "}
    </>
  );
}
