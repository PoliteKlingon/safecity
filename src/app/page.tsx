"use client";

import { HomeFormType, homeFormSchema } from "@/schemas/homeForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Camera from "@/components/home/Camera";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import FormText from "@/components/form/FormText";
import { getHint } from "@/components/home/hints";
import FormTextArea from "@/components/form/FormTextArea";
import FormBoolean from "@/components/form/FormBoolean";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";

const HomePage = () => {
  const methods = useForm<HomeFormType>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: { photos: [] },
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const photos: string[] = methods.watch("photos");

  const onSubmit = (data: HomeFormType) => {
    console.log(data);
  };

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
                <img className="w-52 h-52" key={index} src={photo} />
              ))}
            <div
              className="w-52 h-52 flex cursor-pointer flex-row items-center justify-center bg-gray-700"
              onClick={() => setIsCameraOpen(true)}
            >
              <PlusIcon width={30} height={30} />
            </div>
          </div>

          <FormTextArea
            placeholder={getHint()}
            name="note"
            label="Describe what the problem is"
            className="w-full"
            inputClassName="h-32"
            rows={4}
          />
          <FormBoolean
            name="contactPolice"
            label="Report to local police"
            className="px-4"
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
            className="fixed bottom-16 right-0 m-4 w-16 h-16 rounded-full btn btn-primary"
            type="button"
            onClick={methods.handleSubmit(onSubmit)}
          >
            <CheckIcon width={30} height={30} />
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default HomePage;
