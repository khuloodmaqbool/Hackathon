const HeroSection = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/images/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="hero bg-base-200 h-100  py-28 lg:py-0 lg:h-screen px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div></div>

          <div className="bg-skinColor px-5 py-10 rounded-lg">
            <h5>New Arrival</h5>
            <h1 className="text-5xl font-bold my-3 text-brownColor">
              Discover Our <br /> New Collection
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <button className="py-4 px-8 bg-brownColor text-white mt-6">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
