import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <div className="flex flex-col items-center justify-center gap-6 flex-grow p-6">
        <h1 className="text-2xl text-white font-bold">Information</h1>
        <p className="text-white text-lg">
          Sie können Ihren Befund digital abrufen und auch an Ihren behandelnden
          Arzt weiterleiten lassen. Wenn Sie Ihren Befund lieber ausgedruckt
          erhalten wollen, gehen Sie bitte zum Schalter.
        </p>
      </div>
      <div className="flex justify-between mb-4 mx-4 p-2 w-full gap-4">
        <Link
          href={"/"}
          className="btn btn-ghost border border-primary rounded-full text-primary bg-white text-xl  btn-circle"
        >
          ←
        </Link>
        <Link
          href={"/befund/dein"}
          className="btn btn-primary rounded-full text-white text-xl flex-grow"
        >
          Befunde Digital abrufen
        </Link>
      </div>
    </div>
  );
};

export default page;
