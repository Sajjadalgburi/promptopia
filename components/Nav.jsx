// this will be a client components because we are utlizing

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href={"/"}>
        <Image
          src={"./assets/images/logo.svg"}
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia </p>
      </Link>

      {/* Desktop Nabigation */}
      <div className="sm:flex hidden ">
        {isUserLoggedIn ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                src={"/assets/images/logo.svg"}
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;
