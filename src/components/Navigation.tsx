"use client";
import { useUserContext } from "@/providers/UserProvider";
import {
  ExclamationTriangleIcon,
  HomeIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type AppParts = "home" | "map" | "warnings";

const Navigation = () => {
  const [page, setPage] = useState<AppParts>("home");
  const pathname = usePathname();
  const { user } = useUserContext();

  useEffect(() => {
    switch (pathname) {
      case "/":
        setPage("home");
        break;
      case "/map":
        setPage("map");
        break;
      case "/warnings":
        setPage("warnings");
        break;

      default:
        break;
    }
  }, [pathname]);

  if (!user) return null;

  return (
    <nav className="btm-nav z-50">
      <Link
        href={"/warnings"}
        className={`text-primary ${page === "warnings" ? "active" : ""}`}
      >
        <ExclamationTriangleIcon width={"1.75rem"} />
      </Link>
      <Link
        href={"/"}
        className={`text-primary ${page === "home" ? "active" : ""}`}
      >
        <HomeIcon width={"1.75rem"} />
      </Link>
      <Link
        href={"/map"}
        className={`text-primary ${page === "map" ? "active" : ""}`}
      >
        <MapIcon width={"1.75rem"} />
      </Link>
    </nav>
  );
};

export default Navigation;
