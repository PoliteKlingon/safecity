"use client";
import {
  ArrowPathIcon,
  BoltIcon,
  CameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { Camera as CameraComponent, CameraType } from "react-camera-pro";

type Props = {
  onShot: (photo: string | undefined) => void;
  isOpen: boolean;
  canBeClosed?: boolean;
  close?: () => void;
};

const Camera = ({ onShot, isOpen, canBeClosed, close }: Props) => {
  const cameraRef = useRef<CameraType>(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  if (!isOpen) return null;
  return (
    <div className="z-20">
      <CameraComponent
        ref={cameraRef}
        //numberOfBackCamerasCallback={setNumberOfCameras}
        //facingMode="back"
        errorMessages={{
          noCameraAccessible: "No camera found",
          permissionDenied: "Permission to use the camera was denied",
          switchCamera: "Could not switch cameras",
          canvas: "Canvas was not found",
        }}
      />
      <div className="fixed bottom-20 z-50 w-screen flex flex-row justify-center gap-4 items-center">
        <button
          type="button"
          className="btn bg-teal-700 rounded-full w-12 h-12 p-0"
          disabled={numberOfCameras < 2}
          onClick={() => cameraRef?.current?.switchCamera()}
        >
          <ArrowPathIcon width={20} height={20} />
        </button>
        <button
          type="button"
          className="btn bg-teal-950 rounded-full w-20 h-20 p-0"
          onClick={() => onShot(cameraRef?.current?.takePhoto().toString())}
        >
          <CameraIcon width={30} height={30} />
        </button>
        <button
          type="button"
          className={`btn bg-teal-700 rounded-full w-12 h-12 p-0`}
          // disabled={!cameraRef?.current?.flashStatus().valueOf()}
          // onClick={() => cameraRef?.current?.toggleTorch()}
        >
          <BoltIcon width={20} height={20} />
        </button>
      </div>
      {canBeClosed && close && (
        <button
          type="button"
          className="z-50 fixed top-16 left-0 m-2 btn btn-primary p-3"
          onClick={() => close()}
        >
          <XMarkIcon width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default Camera;
