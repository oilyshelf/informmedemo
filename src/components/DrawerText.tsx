"use client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface DrawerTextProps {
  route: string;
}

const DrawerText: FC<DrawerTextProps> = ({ route }) => {
  const router = useRouter();

  useEffect(() => {
    if ("NDEFReader" in window) {
      //@ts-ignore
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          console.log("Scan started successfully.");

          ndef.onreadingerror = (event: any) => {
            console.log("Error reading data from NFC tag.");
            router.push(route);
          };

          ndef.onreading = (event: any) => {
            router.push(route);
          };
        })
        .catch((error: any) => {
          console.log(`Error! Scan failed to start: ${error}.`);
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img
        src="/nfc.svg"
        alt="nfc"
        className="w-32 h-32 object-contain cursor-pointer"
        onClick={() => router.push(route)}
      />
      <p className="text-center text-base-content">
        Halten Sie die obere Smartphone-Rückseite dicht an Ihre
        Gesundheitskarte.
      </p>
      <p className="text-center text-xs text-base-300">
        Tippe auf das NFC-Symbol, um den Scan zu simulieren.
      </p>
    </div>
  );
};

export default DrawerText;
