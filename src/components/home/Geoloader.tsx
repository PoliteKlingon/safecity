"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState } from "react";

type Props = {
  latitude: number;
  longitude: number;
  setAddress: (value: string) => void;
};

const Geoloader = ({ latitude, longitude, setAddress }: Props) => {
  const [geocoder, setGeocoder] = useState<any>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
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
          setAddress(results[0].formatted_address);
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      },
    );
  }, [latitude, geocoder]);
  return <div />;
};

export default Geoloader;
