"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeaderBanner from "@/app/components/HeaderBanner";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Define types for blog and category data
interface Blog {
  _id: string;
  title: string;
  description: string;
  img: SanityImageSource;
  date: string;
  categoryTitle: string;
  post: string;
}

interface Category {
  title: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Replace any[] with Blog[]
  const [categories, setCategories] = useState<string[]>([]); // No change for categories as it’s just an array of strings
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]); // Replace any[] with Blog[]

  // Fetch blogs and categories from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsQuery = `*[_type == "blog"]{
          _id,
          title,
          description,
          img,
          date,
          "categoryTitle": category->title,
          post
        }`;

        const categoriesQuery = `*[_type == "category"]{
          title
        }`;

        const blogsData = await client.fetch(blogsQuery);
        const categoriesData = await client.fetch(categoriesQuery);

        setBlogs(blogsData);
        setCategories(categoriesData.map((cat: Category) => cat.title));

        setRecentPosts(blogsData.slice(0, 4));  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Header Section */}
      <HeaderBanner heading="Blog" />

      {/* Blog Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4 w-11/12 mx-auto">
        {/* Main Blog Content */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="space-y-5 my-12 pb-6">
              <Image
                className="w-full h-auto object-cover rounded-md"
                src={urlFor(blog.img).url()} 
                alt={blog.title}
                width={400}
                height={200}
                priority
              />
              <h5 className="text-lg font-bold">{blog.title}</h5>
              <p className="text-gray-600">{blog.description}</p>
              <button className="bg-white border-b border-black text-black hover:opacity-75 transition">
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Content */}
        <div className="text-black p-4 rounded-md mt-12">
          {/* Search Box */}
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

          {/* Categories */}
          <h4 className="text-xl font-semibold my-6">Categories</h4>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <p
                key={index}
                className="text-gray-400 hover:text-black cursor-pointer transition"
              >
                {category}
              </p>
            ))}
          </div>

          {/* Recent Posts */}
          <h4 className="text-xl font-semibold my-6">Recent Posts</h4>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div key={post._id} className="flex items-center gap-4">
                <Image
                  src={urlFor(post.img).url()} 
                  alt={post.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover w-32"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-gray-400 text-sm">{post.date}</p>
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
