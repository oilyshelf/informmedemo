import { FC } from "react";
import Logo from "./Logo";

import Link from "next/link";
import Image from "next/image";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="navbar my-4 p-4">
      <div className=" navbar-start"></div>
      <div className="navbar-center">
        <Link href={"/"} className="w-60">
          <Logo />
        </Link>
      </div>
      <div className=" navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
            <div className="w-10 rounded-full flex justify-center items-center">
              <Image
                src={"/GermanyFlag.svg"}
                alt="flag"
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>🇺🇸 Ganz</a>
            </li>
            <li>
              <a>🇪🇸 viele</a>
            </li>
            <li>
              <a>🇰🇿 andere</a>
            </li>
            <li>
              <a>🇹🇷 Sprachen</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
