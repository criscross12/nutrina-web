import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  RiDeleteBin6Line,
  RiFolderHistoryFill,
  RiHealthBookLine,
} from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import { paginate } from "../../utils/paginate";
import Layout from "../../components/layout";
import Swal from "sweetalert2";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { isAuthenticated } from "../../utils/AuthService";
import { NUTRINA_API } from "../../utils/config";
import Image from "next/image";

const Patients = () => {
  const { currentUser, setCurrentUser } = useContext(DataContext);
  const checkLoggedIn = async () => {
    let cuser = isAuthenticated();
    setCurrentUser(cuser);
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  const { push } = useRouter();
  //ComponentDid
  //
  const [users, setUsers] = useState([]);
  const [tableUser, setTableUser] = useState([]);
  const [search, setSearch] = useState("");
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const getUsers = async () => {
    const { data: res } = await axios.get(NUTRINA_API.apiUsers + "/users", {
      headers: {
        Authorization: "Bearer " + currentUser,
      },
    });
    setUsers(res);
    setTableUser(res);
  };

  const handleValueChange = (e) => {
    setSearch(e.target.value);
    filterByValue(e.target.value);
  };

  const filterByValue = (itemValue) => {
    var resSearch = tableUser.filter((e) => {
      if (
        e.name?.includes(itemValue) ||
        e.first_name?.includes(itemValue) ||
        e.second_name?.includes(itemValue)
        // || e.company.name.toString().toLowerCase().includes(itemValue.toLowerCase())
      ) {
        return e;
      }
    });
    setUsers(resSearch);
  };

  const DeleteUser = (uuid) => {
    const deleteP = async () => {
      const response = await axios.delete(
        NUTRINA_API.apiUsers + "/users/" + uuid,
        {
          headers: {
            Authorization: "Bearer " + currentUser,
          },
        }
      );
      getUsers();
    };
    Swal.fire({
      title: "Eliminar paciente?",
      text: "Esta acción desactivará al paciente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteP();
        Swal.fire("Deleted!", "El paciente ha sido eliminado", "success");
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const paginateUsers = paginate(users, currentPage, pageSize);

  return (
    <Layout title="Pacientes">
      <div className="border-b border-gray-600 grid grid-cols-3">
        <div>
          <h1 className="text-2xl font-bold mb-4">Lista de pacientes</h1>
        </div>
        <div>{""}</div>
        <div className="md:top-0 absolute right-8 sm:top-10">
          <Image src="/nutrina1.png" width={150} height={80} />
        </div>
      </div>
      <br />
      <div>
        <Link href={"/admin/consultation"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center"
          >
            <AiOutlineUserAdd /> Nuevo paciente
          </button>
        </Link>
      </div>
      <div className="">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar paciente"
              required=""
              onChange={handleValueChange}
              value={search}
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-teal-500">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Nombre Completo
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Número Telefónico
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Correo electronico
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Edad
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginateUsers.map(
                    (
                      {
                        uuid,
                        name,
                        first_name,
                        second_name,
                        phone,
                        email,
                        age,
                      },
                      i
                    ) => (
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {i + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {name + " " + first_name + " " + second_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {phone}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {age}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap">
                          <button
                            onClick={() => push("/admin/uuid/" + uuid)}
                            class="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
                          >
                            <RiHealthBookLine />
                          </button>
                          &nbsp;
                          <button
                            onClick={() =>
                              push("/admin/history/" + uuid + "?type=history")
                            }
                            class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                          >
                            <RiFolderHistoryFill />
                          </button>
                          &nbsp;
                          <button
                            key={uuid}
                            title="Suspenser paciente"
                            onClick={() => {
                              DeleteUser(uuid);
                            }}
                            class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        items={users.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default Patients;
