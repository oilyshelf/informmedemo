"use client";
import InsuranceCard from "@/src/components/InsuranceCard";
import { v4 as uuid } from "uuid";
import UploadField from "@/src/components/UploadField";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/src/lib/firebase";
import { collection, doc, getFirestore, or, setDoc } from "firebase/firestore";
import {
  generateHL7DocumentReference,
  generateHL7QRY,
  generateHL7ServiceRequest,
} from "@/src/lib/hl7";

const companies = ["AOK", "TK", "Barmer", "DAK", "IKK", "KKH"];

const page = ({}) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const [requestID, setRequestID] = useState<string>(uuid());
  const [insuranceCompany, setInsuranceCompany] = useState<string>(
    companies[Math.floor(Math.random() * companies.length)]
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    setLoading(true);
    const storage = getStorage(app);
    const ext = file.name.split(".").pop();
    const filename = `${requestID}.${ext}`;
    const storageRef = ref(storage, filename);
    const name = session.data?.user?.name || "No Name";

    const document_reference = await generateHL7DocumentReference(
      file.name,
      file,
      file.type
    );

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        const doc_ref = doc(
          collection(getFirestore(app), "requests"),
          requestID
        );
        setDoc(doc_ref, {
          requestID: requestID,
          insuranceCompany: insuranceCompany,
          file: filename,
          originalName: file.name,
          user: {
            name: name,
            insuranceCompany: insuranceCompany,
            insuranceNumber: requestID,
          },
          document_reference: document_reference,
          qry: generateHL7QRY(name),
          service_request: generateHL7ServiceRequest(name, insuranceCompany),
        })
          .then(() => {
            setLoading(false);
            router.push(`/ueberweisung/success/${requestID}`);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (session.data === undefined) return null;

  return (
    <div className="flex flex-col p-4 m-2 gap-6 items-center">
      <InsuranceCard
        name={session.data?.user?.name || "..."}
        company={insuranceCompany}
        insuranceNumber={requestID}
      />
      <UploadField uploadFile={uploadFile} loading={loading} />
    </div>
  );
};

export default page;

page.requireAuth = true;
