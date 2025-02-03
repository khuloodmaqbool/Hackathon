import Image from "next/image";

const Carousel = () => {
  return (
    <section className="bg-lightSkin py-12 ps-12">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Side: Text Content */}
        <div className="flex flex-col justify-center mb-6 md:mb-0 md:me-6 lg:me-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="my-4 text-gray-600">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </p>
          <button className="bg-brownColor font-semibold text-white px-6 py-3 w-fit">
            Explore now
          </button>
        </div>

        {/* Right Side: Carousel */}
        <div className="md:col-span-2">
          <div className="carousel w-full">
            <div
              id="item1"
              className="relative carousel-item w-[180px] md:w-[220px] lg:w-fit h-full mx-2"
            >
              <div className="absolute bottom-5 left-5 bg-white opacity-50 p-2 rounded">
                <h4 className="text-lg">01 ----- Bed Room</h4>
                <h5 className="font-semibold text-black text-2xl">Inner Peace</h5>
              </div>
              <Image
                width={320}
                height={240}
                alt="Carousel Image 1 - Bed Room Inner Peace"
                src="/images/carousel1.png"
                className="object-cover rounded-sm w-[180px] md:w-[220px] lg:w-fit"
                loading="lazy"
              />
            </div>
            <div
              id="item2"
              className="carousel-item w-[180px] md:w-[220px] lg:w-fit h-full mx-2"
            >
              <Image
                width={320}
                height={240}
                alt="Carousel Image 2"
                src="/images/carousel2.png"
                className="object-cover rounded-sm w-[180px] md:w-[220px] lg:w-fit"
                loading="lazy"
              />
            </div>
            <div
              id="item3"
              className="carousel-item w-[180px] md:w-[220px] lg:w-fit h-full mx-2"
            >
              <Image
                width={320}
                height={240}
                alt="Carousel Image 3"
                src="/images/carousel3.png"
                className="object-cover rounded-sm w-[180px] md:w-[220px] lg:w-fit"
                loading="lazy"
              />
            </div>
          </div>

          {/* Carousel Navigation */}
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
    </section>
  );
};

export default Carousel;
