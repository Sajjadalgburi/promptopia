// this will be a client components because we are utlizing

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviderss = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setProviderss();
  }, []);

  const [toggleDropDown, setToggleDropDown] = useState(false);

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
        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link href={"create-prompt"} className="black_btn">
              Create Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={"profile"}>
              <Image
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                src={session?.user.image}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  type="button"
                  key={provider.name}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Nabigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {" "}
            <Image
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              src={session?.user.image}
              // changing the state using a concise way! (does the opposite of what the state was before)
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"profile"}
                  className="dropdown_link"
                  // when the user clicks, it will redirect to '/profile' and set the state of the toggle to false to hide it
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"create-prompt"}
                  className="dropdown_link"
                  // when the user clicks, it will redirect to '/profile' and set the state of the toggle to false to hide it
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Post
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="black_btn mt-5 w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  type="button"
                  key={provider.name}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
