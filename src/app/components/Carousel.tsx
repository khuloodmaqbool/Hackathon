const Carousel = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 bg-lightSkin py-12 ps-12">
          <div className="flex flex-col justify-center me-0 md:me-6 lg:me-0 my-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="my-4 text-gray-600">
              Our designer already made a lot of beautiful prototype of rooms that
              inspire you
            </p>
            <button className="bg-brownColor font-semibold text-white px-6 py-3 w-fit">
              Explore now
            </button>
          </div>
  
          <div className="md:col-span-2 col-span-1">
            <div className="carousel w-full">
              <div
                id="item1"
                className="relative carousel-item w-[180px] md:w-[220px] lg:w-fit h-full mx-2"
              >
                <div className="absolute bottom-5 left-5 bg-white opacity-50 p-2 rounded">
                  <h4 className="text-lg">01 ----- Bed Room</h4>
                  <h5 className="font-semibold text-black text-2xl">Inner Peace</h5>
                </div>
                <img
                  src="/images/carousel1.png"
                  className="object-cover md:w-[220px] w-[180px] lg:w-fit rounded-sm"
                />
              </div>
              <div
                id="item2"
                className="carousel-item w-[180px] md:w-[220px] lg:w-fit h-full mx-2"
              >
                <img
                  src="/images/carousel2.png"
                  className="object-cover md:w-[220px] w-[180px] lg:w-fit rounded-sm"
                />
              </div>
              <div
                id="item3"
                className="carousel-item w-[180px] md:w-[220px] lg:w-fit h-full mx-2"
              >
                <img
                  src="/images/carousel3.png"
                  className="object-cover md:w-[220px] w-[180px] lg:w-fit rounded-sm"
                />
              </div>
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
  <a
    href="#item1"
    className="btn btn-xs rounded-full focus:ring-2 focus:ring-brownColor focus:outline-none"
  >
    <div className="w-2 h-2 rounded-full bg-brownColor"></div>
  </a>
  <a
    href="#item2"
    className="btn btn-xs rounded-full focus:ring-2 focus:ring-brownColor focus:outline-none"
  >
    <div className="w-2 h-2 rounded-full bg-brownColor"></div>
  </a>
  <a
    href="#item3"
    className="btn btn-xs rounded-full focus:ring-2 focus:ring-brownColor focus:outline-none"
  >
    <div className="w-2 h-2 rounded-full bg-brownColor"></div>
  </a>
</div>

          </div>
        </div>
      </>
    );
  };
  
  export default Carousel;
  