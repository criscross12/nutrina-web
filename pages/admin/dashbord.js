import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { isAuthenticated } from "../../utils/AuthService";
import { useEffect } from "react";
import Layout from "../../components/layout";
import CardLineChart from "../../components/Cards/CardLineChart.js";
import CardBarChart from "../../components/Cards/CardBarChart";
import CardUserChart from "../../components/Cards/CardUsers";
import Image from "next/image";
// import CardPageVisits from "../components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "../components/Cards/CardSocialTraffic.js";

export default function Home() {
  const { currentUser, setCurrentUser } = useContext(DataContext);
  const checkLoggedIn = async () => {
    let cuser = isAuthenticated();
    setCurrentUser(cuser);
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Layout title="Dashbord">
      <>
        <div className="border-b border-gray-600 grid grid-cols-3">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Datos estadísticos del consultation
            </h1>
          </div>
          <div>{""}</div>
          <div className="md:top-0 absolute right-8 sm:top-10">
            <Image src="/nutrina1.png" width={150} height={80} />
          </div>
        </div>
        <br />
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardUserChart />
          </div>
        </div>
      </>
    </Layout>
  );
}
