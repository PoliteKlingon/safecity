"use client";

import Loading from "@/components/Loading";
import TipsDialog from "@/components/warnings/TipsDialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ClockIcon,
  MapIcon,
  MapPinIcon,
  MegaphoneIcon,
  NotebookIcon,
  NotebookPenIcon,
  PencilIcon,
  ScaleIcon,
  ShieldPlusIcon,
  SirenIcon,
} from "lucide-react";
import { getDistance } from "geolib";
import { useEffect, useState } from "react";
import { Location, useLocationContext } from "@/providers/LocationProvider";
import { HomeFormType } from "@/schemas/homeForm";

const WarningsPage = () => {
  const { location } = useLocationContext();
  const [warnings, setWarnings] = useState<null | HomeFormType[]>(null);

  const postWarnings = useMutation({
    mutationFn: async (data: Location) =>
      axios.post("/api/reports/query", data),
  });

  useEffect(() => {
    const getWarnings = async (location: Location) => {
      try {
        const res = await postWarnings.mutateAsync(location);

        setWarnings(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (location) {
      getWarnings(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!location) {
    return (
      <div className="flex flex-row gap-3">
        <Loading />
        Getting your current location...
      </div>
    );
  }

  if (postWarnings.isPending && !warnings) return <Loading />;
  if (postWarnings.isError)
    return <div>There was an error while fetching the data.</div>;
  if (!warnings || !Array.isArray(warnings) || warnings.length === 0)
    return <div>There are no warnings.</div>;

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
      {warnings.map((warning) => (
        <div
          className="my-2 p-2 border-b-[1px] border-grey-500 relative"
          key={warning.photos[0]}
        >
          <div className="absolute top-0 right-0 m-2 text-accent flex flex-row justify-end">
            {/* @ts-ignore */}
            {warning.contactpolice && <SirenIcon />}
            {/* @ts-ignore */}
            {warning.ismunicipality && <MegaphoneIcon />}
          </div>
          <div className="flex flex-row gap-2 shrink-0 h-40 overflow-auto">
            {warning.photos.map((photo: string) => {
              return <img key={photo} src={photo} alt="uploaded photo" />;
            })}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="h-4 w-4">
              <NotebookPenIcon className="w-full" />
            </div>
            <span className="my-2 text-lg">{warning.note}</span>
          </div>

          <div className="flex flex-row gap-2 items-center shrink-0">
            <div className="h-4 w-4">
              <MapPinIcon width={20} height={20} />
            </div>
            <span className="my-2 text-md">
              {warning.address ?? "unknown"}{" "}
              {location &&
                `(${
                  getDistance(
                    {
                      latitude: location.latitude,
                      longitude: location.longitude,
                    },
                    {
                      latitude: warning.latitude,
                      longitude: warning.longitude,
                    },
                  ) / 1000
                } km away)`}
            </span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${warning.latitude}%2C${warning.longitude}`}
              target="_blank"
            >
              <button className="btn btn-primary">
                <MapIcon />
              </button>
            </a>
          </div>

          <div className="flex flex-row gap-2 items-center shrink-0">
            <div className="w-4">
              <ClockIcon width={20} height={20} />
            </div>
            <span className="my-2 text-md">
              {new Date(warning.date).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default WarningsPage;
