import { useContext, useEffect } from "react";
import { DataContext } from "../../context/dataContext";
import { isAuthenticated, getMedicalRes } from "../../utils/AuthService";
import { useRouter } from "next/router";
import Navbar from "../../components/indexCool";
import TableFinal from "../../components/tableFinalC";
import DashbordP from "../../components/DashbordP";

export default function Home() {
  const { push, query } = useRouter();
  const { currentUser, setCurrentUser } = useContext(DataContext);
  const checkLoggedIn = async () => {
    let cuser = isAuthenticated();
    setCurrentUser(cuser);
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  let DataResponse;
  if (query.type == "history") {
    DataResponse = <TableFinal data={query} access={currentUser} />;
  } else if (query.type == "finalConsultation") {
    DataResponse = <DashbordP data={query} access={currentUser} />;
  }
  return (
    <div className="md:flex min-h-screen relative">
      <Navbar />
      <br></br>
      <div className="bg-white flex-1 p-8 text-black">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">{DataResponse}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
