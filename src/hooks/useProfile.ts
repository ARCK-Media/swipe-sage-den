import { useState, useEffect } from "react";

export interface Profile {
  name: string;
  photo?: string;
}

const defaultProfile: Profile = {
  name: "Love Seeker",
  photo: undefined,
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = localStorage.getItem("profile");
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  return { profile, setProfile };
};

