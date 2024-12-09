import React from "react";

const HeaderBanner = ({ heading }) => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/header-banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-96 w-full flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl font-semibold">{heading}</h1>
      <div className=" mt-2">Home / {heading}</div>
    </div>
  );
};

export default HeaderBanner;
