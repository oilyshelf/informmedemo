"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col gap-6 p-6 m-2">
      <h1 className="text-2xl text-white font-bold text-center">
        Wie heißt der Arzt der Sie überwiesen hat?
      </h1>
      <input
        type="text"
        placeholder="Suchen Sie nach dem Namen des Arztes"
        className="input input-bordered w-full"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {name.length > 0 && (
        <div className="flex flex-col gap-4">
          <Link
            href="/befund/dein/arzt/ist-toll"
            className="card bg-white hover:bg-gray-100 shadow-lg flex flex-row gap-2 p-6"
          >
            <div className="flex justify-center items-center">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <Image
                    src={"/DoctorAvatar2.png"}
                    alt="doctor"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-grow text-center">
              <p className="font-semibold text-secondary text-xl">
                Dr. med. Lana Mustermannovna
              </p>
              <p className="text">Hausärztin / Allgemeinmedizinerin</p>
            </div>
          </Link>
          <Link
            href="/befund/dein/arzt/ist-toll"
            className="card bg-white hover:bg-gray-100 shadow-lg flex flex-row gap-2 p-6"
          >
            <div className="flex justify-center items-center">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <Image
                    src={"/DoctorAvatar.png"}
                    alt="doctor"
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-grow text-center">
              <p className="font-semibold text-secondary text-xl">
                Dr. Antonbek Rakhmonov
              </p>
              <p className="text">Hausarzt</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
