"use client";
import { IUserSession } from "../../Interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userSession");
    if (userData) {
      setUserSession(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && userSession === null) {
      router.push("/login");
    }
  }, [userSession, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar algo mientras se carga
  }

  return (
    <div className="max-w-4xl mx-auto mb-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome,{" "}
              <span className="text-blue-600">{userSession?.user?.name}</span>
            </h1>
            <div className="bg-indigo-100 rounded-full p-2">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Personal Information
            </h2>
            <p>Your name is: {userSession?.user?.name}</p>
            <p className="text-gray-600">
              Your email is:{" "}
              <span className="font-medium text-gray-800">
                {userSession?.user?.email}
              </span>
            </p>
            <p className="text-gray-600">
              Your address is:{" "}
              <span className="font-medium text-gray-800">
                {userSession?.user?.address || "No address has been provided"}
              </span>
            </p>
            <p className="text-gray-600">
              Your phone number is:{" "}
              <span className="font-medium text-gray-800">
                {userSession?.user?.phone ||
                  "No phone number has been provided."}
              </span>
            </p>
          </div>
          <div className="flex justify-between bg-blue-50 rounded-lg p-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Account Settings
              </h3>
              <p className="text-blue-600">
                Update your profile and preferences
              </p>
            </div>
            <div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
