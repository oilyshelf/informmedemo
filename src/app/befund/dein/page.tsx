import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full w-full">
      <div className="flex flex-col text-center gap-6 flex-grow p-6 w-full">
        <h1 className="text-2xl text-white font-bold">Ihr Befund</h1>
        <div className=" relative w-full h-full">
          <Image
            src={"/befund.png"}
            alt="ihr befund"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mb-4 mx-4 p-2 w-full gap-4">
        <Link
          href={"/"}
          className="btn btn-primary rounded-full text-white text-lg h-full"
        >
          Fertig
        </Link>
        <Link
          href={"/befund/dein/arzt"}
          className="btn btn-primary rounded-full text-white text-lg h-full"
        >
          An Arzt überweisen
        </Link>
      </div>
    </div>
  );
};

export default page;
