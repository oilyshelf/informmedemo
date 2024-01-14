"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NFCDrawer from "../components/NFCDrawer";
import Link from "next/link";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  return (
    <div className="m-6 p-6 flex flex-col gap-12 items-center">
      <Link
        href={"https://www.doctolib.de/"}
        className="btn btn-primary rounded-full text-white text-xl w-full"
      >
        Termin vereinbaren
      </Link>

      <NFCDrawer text="Befund abrufen" route="/befund" />
      <NFCDrawer text="Überweisung nachreichen" route="/ueberweisung" />
      <button
        className="btn btn-secondary btn-sm rounded-full text-white w-1/2"
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/signin" });
        }}
      >
        Logout
      </button>
    </div>
  );
}

Home.requireAuth = true;
