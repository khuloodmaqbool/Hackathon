import Image from "next/image";
import HeaderBanner from "@/app/components/HeaderBanner";
import blogs from "@/app/blog.json";

const Blog = () => {
  const recentPosts = [
    {
      id:1,
      img: "blog4.png",
      title: "Going all-in with millennial design",
      para: "03 Aug 2022",
    },
    {
      id:2,
      img: "blog6.png",
      title: "Exploring new ways of decorating",
      para: "03 Aug 2022",
    },
    {
      id:3,
      img: "blog7.png",
      title: "Handmade pieces that took time to make",
      para: "03 Aug 2022",
    },
    {
      id:4,
      img: "blog8.png",
      title: "Modern home in Milan",
      para: "03 Aug 2022",
    },
    {
      id:5,
      img: "blog9.png",
      title: "Colorful office redesign",
      para: "03 Aug 2022",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <HeaderBanner heading="Blog" />

      {/* Blog Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4 w-11/12 mx-auto">
        {/* Main Blog Content (2/3 of the grid) */}
        <div className="col-span-1  md:col-span-2 space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="space-y-5 my-12 pb-6">
              <Image
                className="w-full h-auto object-cover rounded-md"
                src={`/blog/${blog.img}`}
                alt={blog.title}
                width={400}
                height={200}
              />
              <h5 className="text-lg font-bold ">{blog.title}</h5>
              <p className="text-gray-600 ">{blog.description}</p>
              <button className="bg-white outline-none border-b border-black text-black ">
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Content (1/3 of the grid) */}
        <div className="text-black p-4 rounded-md mt-12">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <h4 className="text-xl font-semibold my-6">Categories</h4>
          <div className="flex flex-col space-y-8 pb-20">
            {["Crafts", "Design", "Handmade", "Interior", "Wood"].map(
              (crnt,ind) => {
                return <p key={ind} className="text-gray-400">{crnt}</p>;
              }
            )}
          </div>

          <h4 className="text-xl font-semibold mb-4">Recent Posts</h4>

          {/* Recent Posts List */}
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-4">
                <Image
                  src={`/blog/${post.img}`}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover w-32"
                />
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-gray-400 text-sm">{post.para}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;


