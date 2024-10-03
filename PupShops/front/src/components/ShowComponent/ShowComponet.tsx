"use client";

import { usePathname } from "next/navigation";
import React from "react";

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname);
  return <>{pathname !== "/login" && children}</>;
};

export default ShowComponent;
