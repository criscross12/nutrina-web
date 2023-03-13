import Image from "next/image";
import Layout from "../../components/layout";

export default function Home() {
  return (
    <Layout>
      {" "}
      <div className="w-full p-5 items-center h-screen">
        <div className="border-b border-gray-600 grid grid-cols-3">
          <div>
            <h1 className="text-2xl font-bold mb-4">Datos de usuario</h1>
          </div>
          <div>{""}</div>
          <div className="md:top-0 absolute right-8 sm:top-10">
            <Image src="/nutrina1.png" width={150} height={80} />
          </div>
        </div>
        <br />
        <figure className="grid gap-4 grid-cols-2 md:flex bg-teal-500 rounded-xl p-8 md:p-0">
          <div>
            <h1>Hola</h1>
          </div>
        </figure>
      </div>
      <div></div>
    </Layout>
  );
}
