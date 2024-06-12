"use client";

import Loading from "@/components/Loading";
import TipsDialog from "@/components/warnings/TipsDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShieldPlusIcon, SirenIcon } from "lucide-react";
import { useState } from "react";

const WarningsPage = () => {
  const warnings = useQuery({
    queryKey: ["get-warnings"],
    queryFn: async () => axios.get("/api/reports"),
  });

  if (warnings.isLoading) return <Loading />;
  if (warnings.isError)
    return <div>There was an error while fetching the data.</div>;
  if (
    !warnings.data ||
    !warnings.data.data ||
    !Array.isArray(warnings.data.data) ||
    warnings.data.data.length === 0
  )
    return <div>There are no warnings.</div>;

  console.log("BLEH", warnings.data.data);

  return (
    <>
      <button
        className="bg-accent py-3 px-4 shadow-2xl text-black m-3 z-50 rounded-full right-0 absolute bottom-16 flex flex-row gap-2"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          )?.showModal()
        }
      >
        <ShieldPlusIcon /> Safety Tips & Tricks
      </button>

      <TipsDialog />

      <div className="my-2 p-2 border-b-[1px] border-grey-500 text-2xl">
        Reported incidents near you
      </div>
      {warnings.data.data.map((warning) => (
        <div
          className="my-2 p-2 border-b-[1px] border-grey-500 relative"
          key={warning.photos[0]}
        >
          {warning.contactpolice && (
            <SirenIcon className="absolute top-0 right-0 m-2 text-accent" />
          )}
          <div className="flex flex-row gap-2 shrink-0 h-40 overflow-auto">
            {warning.photos.map((photo: string) => {
              return <img key={photo} src={photo} />;
            })}
          </div>
          <span>Note: </span>
          <span className="py-2 text-lg font-semibold">{warning.note}</span>
        </div>
      ))}
    </>
  );
};

export default WarningsPage;
