"use client";
import React from "react";

interface ObjType {
  heading: string;
}

const HeaderBanner = ({ heading }: ObjType) => {
  return (
    <header
      className="h-96 w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat text-center "
      style={{ backgroundImage: "url('/images/header-banner.webp')" }}
    >
      <h1 className="text-4xl font-semibold drop-shadow-lg text-black">{heading}</h1>
      <p className="mt-2 text-gray-600">Home / {heading}</p>
    </header>
  );
};

export default React.memo(HeaderBanner);
