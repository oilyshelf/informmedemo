"use client";
import Image from "next/image";
import confirm from "@/public/confirm.svg";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  return (
    <div className="flex justify-center items-center m-6 gap-6 h-full">
      <div className="text-center flex flex-col gap-6 items-center">
        <Image src={confirm} width={100} height={100} alt="confirm_icon" />
        <p className="text-lg font-semibold text-white">
          Danke für die Abgabe.
        </p>
        <p className="text-md text-white ">
          Der Befund wird an den angegebenen Arzt weitergeleitet.Bleiben Sie
          gesund und fit!
        </p>

        <Link
          href={"/"}
          className="btn btn-secondary rounded-full text-white w-full text-xl"
        >
          Zurück zum Hauptmenü
        </Link>
      </div>
    </div>
  );
}
