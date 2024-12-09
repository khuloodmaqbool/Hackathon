import HeaderBanner from "@/app/components/HeaderBanner";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const Contact = () => {
  const contactDetails = [
    {
      title: "Our Location",
      icon: <IoLocationSharp />,
      content: "236 5th SE Avenue, New York NY10000, United States",
    },
    {
      title: "Contact Information",
      icon: <FaPhone />,
      content: (
        <>
          <p>Mobile: +(84) 546-6789</p>
          <p>Hotline: +(84) 456-6789</p>
        </>
      ),
    },
    {
      title: "Working Hours",
      icon: <MdOutlineAccessTimeFilled />,
      content: (
        <>
          <p>Monday-Friday: 9:00 - 22:00</p>
          <p>Saturday-Sunday: 9:00 - 21:00</p>
        </>
      ),
    },
  ];
const inpFields =   [
    { label: "Your Name", type: "text", placeholder: "Abc" },
    { label: "Email", type: "email", placeholder: "Abc@def.com" },
    { label: "Subject", type: "text", placeholder: "This is optional" },
  ]


  return (
    <>
      {/* Header Section */}
      <HeaderBanner heading="Contact Us" />

      {/* Intro Section */}
      <div className="text-center mt-16">
        <h1 className="font-bold text-3xl">Get In Touch With Us</h1>
        <p className="text-gray-400 mt-1 mb-20 md:w-3/5 w-11/12 mx-auto">
          For more information about our products and services, feel free to drop us an email. Our staff is always there to help. Do not hesitate!
        </p>
      </div>

      {/* Contact and Form Section */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 px-5">
        {/* Contact Information */}
        <div className="space-y-10 w-fit mx-auto">
          {contactDetails.map((detail, index) => (
            <div key={index} className=" flex gap-4 ">
              
              <div className="text-black text-2xl">{detail.icon}</div>
              <div className="">
              <h2 className="font-semibold text-xl text-black">
                {detail.title}
              </h2>
                <div className="text-gray-600">{detail.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form className="flex flex-col space-y-8 w-full md:w-4/5">
        {inpFields.map((field, index) => (
            <div key={index}>
              <label className="font-semibold " htmlFor={field.label}>
                {field.label}
              </label>
              <input
                id={field.label}
                type={field.type}
                placeholder={field.placeholder}
                className="input input-bordered input-md w-full mt-4"
              />
            </div>
          ))}

          <div>
            <label className="font-semibold" htmlFor="Message">
              Message
            </label>
            <textarea
              id="Message"
              placeholder="Hi! I’d like to ask about..."
              className="input input-bordered input-md w-full h-20 mt-4"
            />
          </div>

          <button
            type="submit"
            className="bg-brownColor text-white px-20 py-4  rounded-lg w-fit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
