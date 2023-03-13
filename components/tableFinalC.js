import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsFilePdf, BsNodePlusFill } from "react-icons/bs";
import { getMedicalRes, getPatientByUuid } from "../utils/AuthService";
import { useRouter } from "next/router";
import Pdf from "react-to-pdf";
const ref = React.createRef();

export default function tableFinalConsultation({ data, access }) {
  console.log(access);
  const { push } = useRouter();
  const [datas, setData] = useState([]);
  const [patient, setPatient] = useState([]);
  const getPatient = async () => {
    const res = await getPatientByUuid(data["id"], access);
    setPatient(res);
  };
  const getData = async () => {
    const res = await getMedicalRes(data["id"], data["type"], access);
    setData(res);
  };
  useEffect(() => {
    getPatient();
    getData();
  }, []);

  let imgRef = "";
  if (patient["sex"] == "M") {
    imgRef = "/RefMas.png";
  } else if (patient["sex"] == "F") {
    imgRef = "/RefFem.png";
  }

  let datasex = "";
  let dataGC = "";
  let dataGV = "";
  let dataIMC = "";
  let dataICC = "";
  if (patient["sex"] == "F" && patient["age"] >= 20 && patient["age"] <= 39) {
    datasex = "Feminina 20-39 años";
    dataGC = "% Grasa Corporal: 21 - 32.9";
    dataGV = "Grasa Visceral: 1-9";
    dataIMC = "IMC: 18.5-24.9";
    dataICC = "ICC: <0.80";
  } else if (
    patient["sex"] == "F" &&
    patient["age"] >= 40 &&
    patient["age"] <= 59
  ) {
    datasex = "Feminina 40-59 años";
    dataGC = "% Grasa Corporal: 23.0 - 33.9";
    dataGV = "Grasa Visceral: 1-9";
    dataIMC = "IMC: 18.5-24.9";
    dataICC = "ICC: <0.80";
  } else if (
    patient["sex"] == "F" &&
    patient["age"] >= 60 &&
    patient["age"] <= 79
  ) {
    datasex = "Feminina 60-79 años";
    dataGC = "% Grasa Corporal: 24.0 - 35.9";
    dataGV = "Grasa Visceral: 1-9";
    dataIMC = "IMC: 18.5-24.9";
    dataICC = "ICC: <0.80";
  } else if (
    patient["sex"] == "M" &&
    patient["age"] >= 20 &&
    patient["age"] <= 39
  ) {
    datasex = "Masculino 20-39 años";
    dataGC = "% Grasa Corporal: 8.0 - 19.9";
    dataGV = "Grasa Visceral: 1-9";
    dataIMC = "IMC: 33.3-39.9";
    dataICC = "ICC: 0.78-0.93";
  } else if (
    patient["sex"] == "M" &&
    patient["age"] >= 40 &&
    patient["age"] <= 59
  ) {
    datasex = "Masculino 40-59 años";
    dataGC = "% Grasa Corporal: 11.0 - 21.9";
    dataGV = "Grasa Visceral: 1-9";
    dataIMC = "IMC: 18.5-24.9";
    dataICC = "ICC: 0.78-0.93";
  } else if (patient["sex"] == "M" && patient["age"] >= 60) {
    datasex = "Masculino 60 -> años";
    dataGC = "% Grasa Corporal: 11.0 - 21.9";
    dataGV = "Grasa Visceral: 1-9";
    dataIMC = "IMC: 18.5-24.9";
    dataICC = "ICC: 0.78-0.93";
  }

  /** td field component */
  const TD = ({ data }) => <td className="border border-gray-400">{data}</td>;
  const dataPrint = (res) => {
    let createSpace = [];
    datas.map((i) => {
      createSpace.push(<TD data={i ? i[res] : "..."} />);
    });
    if (datas.length < 6) {
      for (let index = datas.length; index < 6; index++) {
        createSpace.push(<TD data="" />);
      }
    }
    return createSpace;
  };

  const dataPrintBM = (pos, res) => {
    let createSpace = [];
    datas.map((i) => {
      createSpace.push(<TD data={i ? i[pos][res] : "..."} />);
    });
    if (datas.length < 6) {
      for (let index = datas.length; index < 6; index++) {
        createSpace.push(<TD data="" />);
      }
    }
    return createSpace;
  };

  const dataPrintOption = () => {
    let createSpace = [];
    datas.map((i) => {
      createSpace.push(
        <TD
          data={
            <div className="flex flex-col items-center">
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full"
                onClick={() =>
                  push("/admin/uuid/" + i.uuid + "?type=updateData")
                }
                key={i.uuid}
              >
                <BsNodePlusFill />
              </button>
            </div>
          }
        />
      );
    });
    if (datas.length < 6) {
      for (let index = datas.length; index < 6; index++) {
        createSpace.push(<TD data="" />);
      }
    }
    return createSpace;
  };

  return (
    <div>
      <table ref={ref} className="min-w-full">
        <tbody>
          <tr>
            <td width="20%" align="center" valign="middle">
              <Image width="130" height="70" src="/Nutrina1.png" />
            </td>
            <td width="60%" align="center" valign="middle">
              <p>
                <strong>L.N Monserrat Piña Jiménez</strong>
              </p>
              <p>Cédula Profesional: 12490409 UAEMéx</p>
            </td>
            <td width="20%" align="center" valign="middle">
              <Image width="150" height="150" src="/Logos.png" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="middle">
              &nbsp;
            </td>
            <td align="left" valign="middle">
              Nombre del paciente:{" "}
              <u>
                {" "}
                {patient["name"] +
                  " " +
                  patient["first_name"] +
                  " " +
                  patient["second_name"]}
              </u>
            </td>
            <td align="center" valign="middle">
              &nbsp;
            </td>
            <div class="linea"></div>
          </tr>
          <tr>
            <td align="center" valign="middle">
              &nbsp;
            </td>
            <td align="left" valign="middle">
              Edad: {patient["age"]}
            </td>
            <td align="center" valign="middle">
              &nbsp;
            </td>
          </tr>
          <tr>
            <td className=" content-center" colSpan={3} valign="middle">
              <table className="table-fixed" width="100%" border={1}>
                <tbody>
                  <tr>
                    <td className="border border-gray-400">N° de medición</td>
                    <td className="border border-gray-400">1 medición</td>
                    <td className="border border-gray-400">2 medición</td>
                    <td className="border border-gray-400">3 medición</td>
                    <td className="border border-gray-400">4 medición</td>
                    <td className="border border-gray-400">5 medición</td>
                    <td className="border border-gray-400">6 medición</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Fecha </td>
                    {dataPrint("created_at")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">T/A mm Hg</td>
                    {dataPrintBM("vital_signs", "blood_pressure")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">
                      Glucemia Capilar (mg/dl)
                    </td>
                    {dataPrintBM("vital_signs", "capillary_glucose")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Peso (kg)</td>
                    {dataPrintBM("basic_measurements", "weight")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Estatura (cm)</td>
                    {dataPrintBM("basic_measurements", "height")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Cintura (cm)</td>
                    {dataPrintBM("basic_measurements", "waist")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Cadera (cm)</td>
                    {dataPrintBM("basic_measurements", "hip")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">ICC</td>
                    {dataPrintBM("basic_measurements", "icc")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">% Grasa</td>
                    {dataPrintBM("body_measurements", "fat_percentage")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Kg Grasa</td>
                    {dataPrintBM("body_measurements", "grasa_kg")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Grasa visceral</td>
                    {dataPrintBM(
                      "body_measurements",
                      "visceral_fat_percentage"
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">% Músculo</td>
                    {dataPrintBM("body_measurements", "muscle_mass_percentage")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Kg músculo</td>
                    {dataPrintBM("body_measurements", "muscle_mass_kg")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Edad corporal</td>
                    {dataPrintBM("body_measurements", "body_age")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">IMC</td>
                    {dataPrintBM("basic_measurements", "imc")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">CMB</td>
                    {dataPrintBM("circumferences", "cmb")}
                  </tr>
                  <tr>
                    <td className="border border-gray-400">Generar DE</td>
                    {dataPrintOption()}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <br></br>
          <tr>
            <td colSpan={2} align="center" valign="middle">
              <table width="50%" border={1}>
                <tbody>
                  <tr>
                    <td className="border border-gray-400">
                      {" "}
                      <p>
                        <strong>Parametros de referencia</strong>
                      </p>
                      <p>
                        <small>{datasex}</small>
                      </p>
                      <p>
                        <small>{dataGC}</small>
                      </p>
                      <p>
                        <small>{dataGV}</small>
                      </p>
                      <p>
                        <small>{dataIMC}</small>
                      </p>
                      <p>
                        <small>{dataICC}</small>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td align="center">
              <Image src={imgRef} width="250" height="200" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col items-center">
        <br></br>
        <Pdf targetRef={ref} filename="Consulta.pdf">
          {({ toPdf }) => (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full flex flex-col items-center"
              onClick={toPdf}
            >
              Imprimir PDF <BsFilePdf />
            </button>
          )}
        </Pdf>
      </div>
    </div>
  );
}
