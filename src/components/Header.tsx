"use client";
import { useUserContext } from "@/providers/UserProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  const { user, setUser } = useUserContext();

  // hide the dropdown when clicked
  // credit https://medium.com/@malikhamzav/how-to-close-daisyui-dropdown-on-click-ea65c5749410
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      //@ts-ignore
      elem?.blur();
    }
  };

  return (
    <header className="navbar bg-teal-800 fixed top-0 left-0">
      <div className="flex-1">
        <a className="text-xl ml-4">SafeCity</a>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 rounded-full">
                <UserCircleIcon />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-32"
            >
              <li>
                <Link onClick={handleClick} href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link onClick={handleClick} href="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <a onClick={() => setUser(null)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
