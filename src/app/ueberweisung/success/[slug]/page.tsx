"use client";

import Image from "next/image";
import confirm from "@/public/confirm.svg";
import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from "@/src/lib/firebase";
import { json } from "stream/consumers";
const mailZod = z.object({
  email: z
    .string()
    .email("Bitte geben sie eine Email Adresse an")
    .min(1, "Bitte geben sie eine Email Adresse an "),
});

type mailSchema = z.infer<typeof mailZod>;

export default function Page({ params }: { params: { slug: string } }) {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<mailSchema>({ resolver: zodResolver(mailZod) });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<mailSchema> = (data) => {
    setLoading(true);

    const info_ref = doc(
      collection(getFirestore(app), "requests"),
      params.slug
    );

    getDoc(info_ref).then((doc_snapshot) => {
      //   console.log(doc.data());
      const originalName: string = doc_snapshot.get("originalName");
      const user: {
        name: string;
        insuranceCompany: string;
        insuranceNumber: string;
      } = doc_snapshot.get("user");

      const doc_ref = doc_snapshot.get("document_reference");
      const qry = doc_snapshot.get("qry");
      const service_request = doc_snapshot.get("service_request");

      const mail = {
        to: data.email,
        message: {
          subject: "Bestätigung über Nachreichung",
          text: `Sehr geehrte Damen und Herren,\n\nhiermit bestätigen wir, dass wir die Überweisung (${originalName}) von ${
            user.name
          } mit der Versicherungsnummer ${
            user.insuranceNumber
          } der Versicherung ${
            user.insuranceCompany
          } erhalten haben.\n\nMit freundlichen Grüßen\n\n Ihr InformMe Team
          \n\n\n\n
          --------------------------------------------------------------------\n
          HL7-QRY:\n
          ${qry}\n
          --------------------------------------------------------------------\n
          HL7-Service Request:\n
          ${JSON.stringify(service_request, null, 4)}\n
          --------------------------------------------------------------------\n
          HL7-Document Reference:\n
          ${JSON.stringify(doc_ref, null, 4)}\n
          --------------------------------------------------------------------\n
          `,
        },
      };
      //   console.log(mail);
      setDoc(doc(collection(getFirestore(app), "mail")), mail).then(() => {
        toast.custom((t) => {
          return (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Email wurde versandt</span>
            </div>
          );
        });
        setLoading(false);
        router.push("/");
      });
    });
  };

  return (
    <div className="flex justify-center items-center m-6 gap-6">
      <div className="text-center flex flex-col gap-6 items-center">
        <Image src={confirm} width={100} height={100} alt="confirm_icon" />
        <p className="text-lg font-semibold text-white">
          Überweisung wurde erfolgreich nachgereicht
        </p>
        <p className="text-sm text-white ">
          Wollen sie eine Bestätigung per Email erhalten?
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              </label>
            )}
          </div>
          <button
            className=" btn btn-primary rounded-full text-white text-xl w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              "Bestätigung Anfordern"
            )}
          </button>
        </form>
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
