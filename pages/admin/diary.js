import Image from "next/image";
import Layout from "../../components/layout";

export default function diary() {
  return (
    <Layout title="Dashbord">
      <div className="border-b border-gray-600 grid grid-cols-3">
        <div>
          <h1 className="text-2xl font-bold mb-4">Agenda de consultas</h1>
        </div>
        <div>{""}</div>
        <div className="md:top-0 absolute right-8 sm:top-10">
          <Image src="/nutrina1.png" width={150} height={80} />
        </div>
      </div>
      <br />
      <h1>Hola mundo </h1>
    </Layout>
  );
}
