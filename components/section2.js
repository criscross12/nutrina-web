import React from "react";
import Image from "next/image";

export default function section2(){
  return(
      <div className="min-w-7xl mx-20 my-24">
        <div className="text-center mb-10 flex-col flex">
            <h2 className="font-fold md:text-5xl text-4xl text-gray-800 mb-4">Servicios</h2>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-y-5">
          {/**first block */}
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-2" >
              <div className="bg-indigo-200 rounded-md p-10 h-full">
              <Image src={"/images/nutrina1.png"} width={700} height={450}/>
                <span className="text-primary font-semibold text-lg block mb-4">Consulta Nutricional</span>
                <span className="text-primary font-semibold text-lg block mb-4">Incluye:</span>
                <h1>•Valoración del Estado Nutricional.</h1>
                <br/>
                <h1>•Orientación alimentaria.</h1>
                <br></br>
                <h1>•Plan de alimentación personalizado, en base a tus necesidades, presupuesto, preferencias y horarios.</h1>
              </div>
            </div>
          </div>
          {/**second block */}
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-2">
              <div className="bg-indigo-200 border-gray-800 rounded-md p-10 h-full">
              <Image src={"/images/ima.png"} width={2800} height={1600}/>
                <span className="text-primary font-semibold text-lg block mb-4">Servicios Nutricionales</span>
                <div className="flow-root"><h1 className="float-left">Toma de glucosa capilar</h1><Image className="float-right" src={"/images/NUTR.png"} width={40} height={35}/></div>
                <div className="flow-root"><h1 className="float-left">Toma de presión arterial</h1><Image className="float-right" src={"/images/NU.png"} width={45} height={35}/></div>
                <br/>
                <table class="border-2 border-white border-separate text-center justify-items-center">
                  <thead>
                    <tr>
                      <th class="border border-gray-400" colSpan={2}>Planes de alimentación personalizados</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-white">Diabetes</td>
                          <td class="border border-white">Osteoporosis</td>
                          </tr>
                          <tr>
                            <td class="border border-white">Hipertensión arterial</td>
                            <td class="border border-white">Anemia</td>
                            </tr>
                            <tr>
                              <td class="border border-white">Triglicéridos</td>
                              <td class="border border-white">Desnutrición</td>
                              </tr>
                              <tr>
                                <td class="border border-white">Ácido Úrico</td>
                                <td class="border border-white">Hipotiroidismo</td>
                                </tr>
                                <tr>
                                  <td class="border border-white">Control de peso</td>
                                  <td class="border border-white">Menopausia</td>
                                  </tr>
                                  </tbody>
                                  </table>
                                  </div>
                                  </div>
                                  </div>
        {/**tercer block */}
         <div className="flex flex-wrap justify-center">
              <div className="w-full px-2">
                <div className="bg-indigo-200 border-gray-800 rounded-md p-10 h-full">
                  <span className="text-primary font-semibold text-lg block mb-4">Análisis de composición corporal</span>
                  <table class="border-separate border border-none text-center">
                    <thead>
                      <tr>
                        <td className=" border-none">Bioimpedancia eléctrica</td>
                        <td className=" border-none" rowspan="2"><img src="imagen6.png" className="object-center w-20 h-26"></img></td>
                        </tr>
                        <tr>
                          <td className=" border-none">Técnica antropométrica ISAK</td>
                          </tr>
                          <tr>
                            <td className=" border-none">Masa ósea</td>
                            <td className=" border-none"><img src="imagen5.png" className="float-left" width={50} height={150}></img></td>
                            </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className=" border-none">Masa muscular</td>
                                <td className=" border-none"><img src="imagen7.png" className="float-left" width={50} height={150}></img></td>
                                </tr>
                                <tr>
                                  <td className=" border-none">Masa grasa</td>
                                  <td className=" border-none"><img src="imagen8.png" className="float-left" width={50} height={150}></img></td>
                                  </tr>
                                  <tr>
                                    <td className=" border-none">Agua corporal</td>
                                    <td className=" border-none"><img src="imagen9.png" className="float-left" width={50} height={150}></img></td>
                                    </tr>
                                    </tbody>
                                    </table>
                </div>
                </div>
                </div>
                </div>
    </div>
  );
}