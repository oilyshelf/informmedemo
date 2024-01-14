"use client";
import { FC } from "react";
import Image from "next/image";
import dots from "@/public/dots.svg";

interface InsuranceCardProps {
  name: string;
  company: string;
  insuranceNumber: string;
}

const InsuranceCard: FC<InsuranceCardProps> = ({
  name,
  company,
  insuranceNumber,
}) => {
  return (
    <div className="card bg-white max-w-80 h-48 w-full image-full card-bordered shadow-xl overflow-hidden hover:scale-105 ease-linear hover:shadow-lg">
      <figure>
        <Image
          src={dots}
          alt="dots"
          style={{
            objectFit: "cover",
            scale: "5",
            transform: "translate(60px, -40px) rotate(20deg)",
          }}
          placeholder="empty"
          priority={false}
        />
      </figure>
      <div className="p-2 flex flex-col justify-end flex-grow relative z-20 ">
        <p className="font-semibold text-secondary">{company}</p>
        <p>{name}</p>
        <p className="text-sm">{insuranceNumber}</p>
      </div>
    </div>
  );
};

export default InsuranceCard;
