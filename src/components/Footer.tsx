import Link from "next/link";
import { FC } from "react";

interface FooterProps {}
//bg-[#EEF6E6]
const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="footer footer-center p-4 glass text-base-content">
      <aside>
        <p>
          Copyright © 2023 - All right reserved by{" "}
          <Link className="hover:underline" href="https://www.mediem.ai">
            mediem.ai
          </Link>{" "}
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
