"use client";

import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";

export type Location = { latitude: number; longitude: number };

type LocationContextType = {
  location: Location | null;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
});

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider",
    );
  }
  return context;
};

const LocationProvider = ({ children }: PropsWithChildren) => {
  const [location, setLocation] = useState<Location | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        //success
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        //error
        () => {
          console.log("Not able to find location");
        },
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(getLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
