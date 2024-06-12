"use client";
/* global google */

import { HomeFormType, homeFormSchema } from "@/schemas/homeForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Camera from "@/components/home/Camera";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { getHint } from "@/components/home/hints";
import FormTextArea from "@/components/form/FormTextArea";
import FormBoolean from "@/components/form/FormBoolean";
import {
  CheckIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import FormText from "@/components/form/FormText";
import { Loader } from "@googlemaps/js-api-loader";
import {} from "@react-google-maps/api";

const HomePage = () => {
  const postWarning = useMutation({
    mutationFn: (data: HomeFormType) => axios.post("/api/reports", data),
  });

  const methods = useForm<HomeFormType>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: {
      photos: [],
      contactPolice: false,
      latitude: -999,
      longitude: -999,
      date: new Date().toString(),
      isMunicipality: false,
    },
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const photos: string[] = methods.watch("photos");
  const latitude: number = methods.watch("latitude");
  const longitude: number = methods.watch("longitude");

  const onSubmit = (data: HomeFormType) => {
    console.log(data);
    postWarning.mutate(data);
    methods.reset();
    setIsCameraOpen(true);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      //success
      (position) => {
        methods.setValue("latitude", position.coords.latitude);
        methods.setValue("longitude", position.coords.longitude);
      },
      //error
      () => {
        console.log("Not able to find location");
      },
    );
  }

  const [geocoder, setGeocoder] = useState<any>(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCIo5k1cgS12vTRTdRRTOZDMV0czVhGOlY",
      version: "weekly",
    });
    loader.load().then(() => {
      // Initialize the geocoder after the API is loaded
      setGeocoder(new google.maps.Geocoder());
    });
  }, []);
  useEffect(() => {
    // Ensure geocoder and address are available
    if (!geocoder || !latitude || latitude < -180) return;

    geocoder.geocode(
      {
        location: new google.maps.LatLng(latitude, longitude),
      },
      (results: any, status: any) => {
        if (status == "OK") {
          console.log("RES", results);

          methods.setValue("address", results[0].formatted_address);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      },
    );
  }, [latitude, geocoder]);

  return (
    <>
      <FormProvider {...methods}>
        <form className="pt-4 px-2 flex flex-col gap-6">
          <div className=" w-full border-b-[2px] border-b-white px-4 text-xl pb-2">
            Report problem
          </div>
          <div className="flex flex-row gap-2 overflow-x-auto">
            {photos &&
              photos.length > 0 &&
              photos.map((photo: string, index: number) => (
                <div className="relative shrink-0">
                  <img className="h-52 rounded-lg" key={index} src={photo} />
                  <button
                    type="button"
                    className="btn btn-link absolute top-0 left-0"
                    onClick={() => {
                      photos.splice(index, 1);
                      methods.setValue("photos", photos);
                    }}
                  >
                    <TrashIcon width={20} height={20} />
                  </button>
                </div>
              ))}
            <div
              className="w-52 h-52 shrink-0 rounded-lg flex cursor-pointer flex-row items-center justify-center bg-gray-700"
              onClick={() => setIsCameraOpen(true)}
            >
              <PlusIcon width={30} height={30} />
            </div>
          </div>
          <ErrorMessage
            name="photos"
            errors={methods.formState.errors}
            render={({ message }) => <p className="text-red-600">{message}</p>}
          />

          <FormTextArea
            placeholder={getHint()}
            name="note"
            label="Describe what the problem is"
            className="w-full"
            inputClassName="h-32"
            rows={4}
          />

          <FormText
            name="address"
            label="Approximate address"
            className="w-full -mt-6 -mb-2"
          />

          <FormBoolean
            name="contactPolice"
            label="Report to local police"
            className="px-4"
          />

          {!latitude ||
            (latitude < -90 && (
              <div className="flex flex-row gap-2 ml-2">
                <Loading />
                Getting your current location...
              </div>
            ))}

          <ErrorMessage
            name="latitude"
            errors={methods.formState.errors}
            render={({ message }) => <p className="text-red-600">{message}</p>}
          />

          <Camera
            isOpen={isCameraOpen}
            canBeClosed={photos && photos.length > 0}
            close={() => setIsCameraOpen(false)}
            onShot={(photo) => {
              if (photo) {
                photos.push(photo);
                //@ts-ignore
                methods.setValue("photos", photos);
                setIsCameraOpen(false);
              }
            }}
          />

          <button
            className="fixed bottom-16 right-0 m-4 z-10 w-16 h-16 rounded-full btn btn-primary"
            type="button"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={!latitude || latitude < -90 || postWarning.isPending}
          >
            {postWarning.isPending ? (
              <Loading />
            ) : (
              <CheckIcon width={30} height={30} />
            )}
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default HomePage;
