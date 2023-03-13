import Link from "next/link";
import { Men, Cart } from "./icons";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { login } from "../utils/AuthService";
import { useState } from "react";
import Image from "next/image";

const Log = () => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [status, setStatus] = useState(true);
  const { push } = useRouter();
  const { register, handleSubmit } = useForm({});
  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      if (user.statusCode == 401) setStatus(false);
      if (user["roles"] == "super_admin") {
        setCookie("user", user["token"], {
          path: "/",
          maxAge: 3600 * 2, // Expires after 1hr
          sameSite: true,
        });
        push("/admin/dashbord");
      } else if (user["roles"] == "patient") {
        setCookie("user", user["token"], {
          path: "/",
          maxAge: 3600 * 2, // Expires after 1hr
          sameSite: true,
        });
        push("/patients/welcome");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <main className="min-w-screen min-h-screen hero flex items-center justify-center px-5 py-5">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0 height: 500px">
            <div className="flex flex-col w-full md:w-1/2 p-4">
              <div className="flex flex-col flex-1 justify-center mb-4">
                <div className="flex justify-center">
                  <Image
                    alt="test"
                    src="/nutrina1.png"
                    width="200"
                    height="100"
                    className="flex justify-center"
                  />
                </div>
                <h1 className="text-4xl text-center font-blond text-green-500">
                  Bienvenido
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" mt-5 form-horizontal w-3/4 mx-auto">
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-1">
                        <div className="rounded-lg border-2 border-gray-400 w-34 p-2 flex items-center">
                          <Cart className="text-gray-400" />
                          <input
                            type="text"
                            {...register("user", { required: true })}
                            placeholder="Credencial de usuario"
                            className="bg-transparent outline-none text-sm"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-1 mt-2">
                        <div className="rounded-lg border-2 border-gray-400 w-34 p-2 flex items-center">
                          <Men className="text-gray-400" />
                          <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="*************"
                            className="outline-none text-sm bg-transparent"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div
                      hidden={status}
                      class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                      role="alert"
                    >
                      <p class="text-sm">Credenciales incorrectas.</p>
                    </div>
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded"
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                    <div className="flex flex-col mt-4">
                      <Link href={"/initial"}>
                        <button
                          type="submit"
                          className="bg-cyan-500 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded"
                        >
                          Regresar al inicio
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden md:flex md:w-1/2 w-full">
              <Image
                alt="test"
                width="400"
                height="100"
                src="/cd.jpg"
                className="flex rounded-r-lg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Log;
