"use client";
import { useUserContext } from "@/providers/UserProvider";
import { UserIcon } from "@heroicons/react/24/outline";

const ProfilePage = () => {
  const { user, setUser } = useUserContext();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <UserIcon width={"5rem"} />
      <span className="text-2xl">{user?.name}</span>
      <span className="text-lg">Login: {user?.login}</span>
      <button
        onClick={() => {
          setUser(null);
        }}
        className="btn btn-primary px-12 mt-8"
      >
        Log out
      </button>
    </div>
  );
};

export default ProfilePage;
